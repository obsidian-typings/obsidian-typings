import { existsSync } from 'node:fs';
import {
  cp,
  mkdir,
  readFile,
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

interface BuildInfo {
  branch: string;
  docsTreeHash: string;
}

async function main(): Promise<void> {
  const outputDir = process.env['OUTPUT_DIR'] ?? './site';
  const cacheDir = process.env['CACHE_DIR'] ?? './cache';
  const shouldForce = process.env['EVENT_NAME'] === 'workflow_dispatch';

  for (const channel of CHANNELS) {
    await processChannel(channel, outputDir, cacheDir, shouldForce);
  }

  await createRedirectPage(outputDir);
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

async function processChannel(channel: Channel, outputDir: string, cacheDir: string, shouldForce: boolean): Promise<void> {
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
  await execFromRoot('npm run setup', { cwd: 'docs' });
  await execFromRoot(`npm run build -- --base /obsidian-typings/${channel}`, { cwd: 'docs' });

  await mkdir(channelOutputDir, { recursive: true });
  await cp('docs/dist', channelOutputDir, { recursive: true });

  await mkdir(channelCacheDir, { recursive: true });
  await cp('docs/dist', `${channelCacheDir}/dist`, { recursive: true });
  await writeFile(`${channelCacheDir}/build-info.json`, JSON.stringify(current));
}

async function createRedirectPage(outputDir: string): Promise<void> {
  await mkdir(outputDir, { recursive: true });
  await cp(`${SCRIPT_DIR}/static/pages-redirect.html`, `${outputDir}/index.html`);
  console.log(`Created redirect page at ${outputDir}/index.html`);
}

await main();
