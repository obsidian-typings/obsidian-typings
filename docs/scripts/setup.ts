/**
 * Sets up API docs generation.
 *
 * Creates a temporary git worktree on the latest release branch,
 * installs just the obsidian package for official type definitions,
 * then runs the API docs generator against the worktree's source files.
 */

import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import {
  dirname,
  join
} from 'node:path/posix';
import { fileURLToPath } from 'node:url';

import {
  execFromRoot,
  toPosixPath
} from './helpers/exec.ts';
import {
  generateBranchName,
  getLatestVersion
} from './helpers/version.ts';

const DOCS_DIR = dirname(dirname(toPosixPath(fileURLToPath(import.meta.url))));
const ROOT_DIR = dirname(DOCS_DIR);

async function main(): Promise<void> {
  const CHANNEL_ARG_INDEX = 2;
  const channelArg = process.argv[CHANNEL_ARG_INDEX] ?? process.env['CURRENT_CHANNEL'] ?? 'public';
  if (channelArg !== 'public' && channelArg !== 'catalyst') {
    console.error(`Invalid channel: ${channelArg}. Use "public" or "catalyst".`);
    process.exit(1);
  }
  const channel = channelArg;

  // Resolve the release branch
  const latestVersion = await getLatestVersion(channel);
  const latestBranch = generateBranchName({ channel, obsidianVersion: latestVersion });
  console.warn(`Using release branch: ${latestBranch}`);

  // Create temporary worktree
  const tempDir = toPosixPath(join(toPosixPath(tmpdir()), `obsidian-typings-docs-${channel}`));
  if (existsSync(tempDir)) {
    console.warn('Removing stale worktree...');
    await execFromRoot(`git worktree remove --force "${tempDir}"`, { cwd: ROOT_DIR, shouldIgnoreExitCode: true, isQuiet: true });
    await rm(tempDir, { force: true, recursive: true });
  }

  console.warn(`Creating worktree at ${tempDir}...`);
  await execFromRoot(
    `git worktree add --detach "${tempDir}" "${latestBranch}"`,
    { cwd: ROOT_DIR }
  );

  try {
    // Install only obsidian for official .d.ts
    console.warn('Installing obsidian package...');
    await execFromRoot(
      'npm install obsidian --ignore-scripts',
      { cwd: tempDir, shouldFailIfCalledFromOutsideRoot: false }
    );

    const obsidianDtsPath = join(tempDir, 'node_modules/obsidian/obsidian.d.ts');
    console.warn(existsSync(obsidianDtsPath) ? 'Official obsidian.d.ts found.' : 'WARNING: obsidian.d.ts not found.');

    // Run the generator pointing at the worktree
    console.warn('Generating API docs...');
    process.env['TYPINGS_ROOT'] = tempDir;
    process.env['CURRENT_CHANNEL'] = channel;
    await execFromRoot(['jiti', './scripts/generate-api-docs.ts'], { cwd: DOCS_DIR });
  } finally {
    delete process.env['TYPINGS_ROOT'];
    console.warn('Cleaning up worktree...');
    await execFromRoot(`git worktree remove --force "${tempDir}"`, { cwd: ROOT_DIR, shouldIgnoreExitCode: true, isQuiet: true });
    await rm(tempDir, { force: true, recursive: true });
  }
}

await main();
