import { existsSync } from 'node:fs';
import {
  cp,
  mkdir,
  readdir,
  readFile,
  rm,
  stat,
  writeFile
} from 'node:fs/promises';
import { dirname } from 'node:path/posix';
import { fileURLToPath } from 'node:url';

import { generateBranchName } from './helpers/branchSpec.ts';
import { execFromRoot } from './helpers/exec.ts';
import { getLatestVersion } from './helpers/version.ts';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

const CHANNELS = ['public', 'catalyst'] as const;
type Channel = typeof CHANNELS[number];

/**
 * GitHub Pages rejects artifacts over 1 GB, and the failure mode is terrible: the upload only
 * warns, then the deploy sits in `deployment_in_progress` until it times out, an hour into the run.
 * Failing here names the cause immediately instead.
 *
 * This is an UNCOMPRESSED proxy for a cap that applies to the gzipped artifact, so the number is
 * not the cap itself. Measured on the 1.13.4 public channel: 318 MB per channel, ~635 MB for both.
 * The artifact compresses far below that now that the incompressible per-page PNGs are gone -- the
 * 1.08 GB artifact that broke was 9.5 GB uncompressed, and roughly half of it was those PNGs. The
 * budget therefore sits at a bit over 2x today's size: high enough not to fire on ordinary API
 * growth, low enough to catch anything resembling the regression it exists to prevent.
 */
const MAX_SITE_SIZE_IN_BYTES = 1500 * 1024 * 1024;

interface BuildInfo {
  branch: string;
  docsTreeHash: string;
}

async function main(): Promise<void> {
  const outputDir = process.env['OUTPUT_DIR'] ?? './site';
  const cacheDir = process.env['CACHE_DIR'] ?? './cache';
  // Opt-in, not "any manual run": the release workflow dispatches this build, so keying off the
  // event name forced a full two-channel rebuild (~1 h) after every release and the cache never
  // once hit. A release changes the branch name of the channel it touched, which invalidates that
  // channel's cache on its own; the untouched channel is served from cache.
  const shouldForce = process.env['FORCE'] === 'true';

  // Read static assets before the loop — processChannel checks out release
  // branches where workflow-scripts/static/ does not exist.
  const redirectHtml = await readFile(`${SCRIPT_DIR}/static/pages-redirect.html`, 'utf-8');

  // Collect both channel versions upfront so the version switcher can display them.
  const versions: Record<Channel, string> = {
    catalyst: await getLatestVersion('catalyst'),
    public: await getLatestVersion('public')
  };

  for (const channel of CHANNELS) {
    await processChannel(channel, outputDir, cacheDir, shouldForce, versions);
  }

  await createRedirectPage(outputDir, redirectHtml);
  await assertSiteSize(outputDir);
}

async function assertSiteSize(outputDir: string): Promise<void> {
  const sizeInBytes = await getDirectorySize(outputDir);
  const MEGABYTE = 1024 * 1024;
  const sizeInMegabytes = Math.round(sizeInBytes / MEGABYTE);
  console.log(`Site size: ${String(sizeInMegabytes)} MB`);

  if (sizeInBytes > MAX_SITE_SIZE_IN_BYTES) {
    throw new Error(
      `Site is ${String(sizeInMegabytes)} MB, over the ${String(Math.round(MAX_SITE_SIZE_IN_BYTES / MEGABYTE))} MB budget. `
        + 'GitHub Pages hard-fails above 1 GB, so this would otherwise surface as a deploy timeout an hour from now.'
    );
  }
}

/**
 * The whole site navigates through one shared sidebar document, so if that document renders without
 * the API tree every page loses its navigation at once — and nothing else fails. It shipped that way
 * exactly once, because the tree was read through a path that is only valid outside the bundle, and
 * the miss was a console warning nobody reads. Assert the built artifact instead of trusting it.
 */
async function assertSidebarHasApiTree(channel: Channel): Promise<void> {
  const sidebarPath = 'docs/dist/sidebar/index.html';
  if (!existsSync(sidebarPath)) {
    throw new Error(`${channel}: ${sidebarPath} was not built. The sidebar every page embeds is missing.`);
  }

  const html = await readFile(sidebarPath, 'utf-8');
  const apiLinkCount = html.match(/href="[^"]*\/api\//g)?.length ?? 0;
  const MIN_EXPECTED_API_LINKS = 100;

  if (apiLinkCount < MIN_EXPECTED_API_LINKS) {
    throw new Error(
      `${channel}: the shared sidebar document has only ${String(apiLinkCount)} API links (expected at least `
        + `${String(MIN_EXPECTED_API_LINKS)}). Every page embeds this document, so the API reference would be `
        + 'unreachable from the whole site.'
    );
  }

  console.log(`${channel}: sidebar contains ${String(apiLinkCount)} API links.`);
}

async function getDirectorySize(dir: string): Promise<number> {
  let total = 0;

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = `${dir}/${entry.name}`;
    total += entry.isDirectory() ? await getDirectorySize(fullPath) : (await stat(fullPath)).size;
  }

  return total;
}

async function getCurrentBuildInfo(channel: Channel): Promise<BuildInfo> {
  const latestVersion = await getLatestVersion(channel);
  const branch = generateBranchName({ channel, obsidianVersion: latestVersion });
  const docsTreeHash = (await execFromRoot('git rev-parse main:docs', { isQuiet: true })).trim();
  return { branch, docsTreeHash };
}

async function getCachedBuildInfo(cacheDir: string, channel: Channel): Promise<BuildInfo | null> {
  const infoPath = `${cacheDir}/${channel}/build-info.json`;
  if (!existsSync(infoPath)) {
    return null;
  }

  const content = await readFile(infoPath, 'utf-8');
  return JSON.parse(content) as BuildInfo;
}

async function processChannel(channel: Channel, outputDir: string, cacheDir: string, shouldForce: boolean, versions: Record<Channel, string>): Promise<void> {
  const current = await getCurrentBuildInfo(channel);
  const cached = await getCachedBuildInfo(cacheDir, channel);
  const channelCacheDir = `${cacheDir}/${channel}`;
  const channelOutputDir = `${outputDir}/${channel}`;

  const isCacheValid = !shouldForce
    && cached !== null
    && cached.branch === current.branch
    && cached.docsTreeHash === current.docsTreeHash;

  if (isCacheValid) {
    console.log(`\n=== ${channel}: cache is up to date (${current.branch}), skipping build ===\n`);
    await cp(`${channelCacheDir}/dist`, channelOutputDir, { recursive: true });
    return;
  }

  console.log(`\n=== ${channel}: building docs (${current.branch}) ===\n`);
  if (cached !== null) {
    console.log(`Cache invalidated: branch ${cached.branch} -> ${current.branch}, docsHash ${cached.docsTreeHash} -> ${current.docsTreeHash}`);
  }

  await execFromRoot(`git checkout ${current.branch}`);
  await execFromRoot('git checkout main -- docs/');

  await execFromRoot('npm ci');
  await execFromRoot('npm ci', { cwd: 'docs' });
  process.env['CURRENT_CHANNEL'] = channel;
  process.env['BASE_PATH'] = `/obsidian-typings/${channel}`;
  process.env['LATEST_PUBLIC_TYPINGS_VERSION'] = versions.public;
  process.env['LATEST_CATALYST_TYPINGS_VERSION'] = versions.catalyst;

  await execFromRoot('npm run setup', { cwd: 'docs' });
  await execFromRoot(`npm run build -- --base /obsidian-typings/${channel}`, { cwd: 'docs' });

  await assertSidebarHasApiTree(channel);

  await mkdir(channelOutputDir, { recursive: true });
  await cp('docs/dist', channelOutputDir, { recursive: true });

  await mkdir(channelCacheDir, { recursive: true });
  // `cp` merges into whatever the cache restored, so pages deleted upstream would linger forever
  // and the cache would only ever grow. Replace it outright.
  await rm(`${channelCacheDir}/dist`, { force: true, recursive: true });
  await cp('docs/dist', `${channelCacheDir}/dist`, { recursive: true });
  await writeFile(`${channelCacheDir}/build-info.json`, JSON.stringify(current));
}

async function createRedirectPage(outputDir: string, redirectHtml: string): Promise<void> {
  await mkdir(outputDir, { recursive: true });
  await writeFile(`${outputDir}/index.html`, redirectHtml);
  console.log(`Created redirect page at ${outputDir}/index.html`);
}

await main();
