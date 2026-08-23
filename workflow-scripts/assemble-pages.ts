import {
  mkdir,
  readdir,
  readFile,
  stat,
  writeFile
} from 'node:fs/promises';
import { dirname } from 'node:path/posix';
import { fileURLToPath } from 'node:url';

import { CHANNELS } from './helpers/branchSpec.ts';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

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

async function main(): Promise<void> {
  const outputDir = process.env['OUTPUT_DIR'] ?? './site';
  const redirectHtml = await readFile(`${SCRIPT_DIR}/static/pages-redirect.html`, 'utf-8');

  await assertChannelsArePresent(outputDir);
  await createRedirectPage(outputDir, redirectHtml);
  await assertSiteSize(outputDir);
}

/**
 * Each channel arrives as its own artifact from its own job. A job that failed while the other
 * succeeded would otherwise deploy a site whose version switcher points at a channel that is not
 * there — a half-site published over a whole one.
 */
async function assertChannelsArePresent(outputDir: string): Promise<void> {
  for (const channel of CHANNELS) {
    const channelDir = `${outputDir}/${channel}`;
    const entries = await readdir(channelDir).catch(() => []);
    if (entries.length === 0) {
      throw new Error(`${channelDir} is missing or empty. Deploying would publish a site without the ${channel} channel.`);
    }
  }
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

async function getDirectorySize(dir: string): Promise<number> {
  let total = 0;

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = `${dir}/${entry.name}`;
    total += entry.isDirectory() ? await getDirectorySize(fullPath) : (await stat(fullPath)).size;
  }

  return total;
}

async function createRedirectPage(outputDir: string, redirectHtml: string): Promise<void> {
  await mkdir(outputDir, { recursive: true });
  await writeFile(`${outputDir}/index.html`, redirectHtml);
  console.log(`Created redirect page at ${outputDir}/index.html`);
}

await main();
