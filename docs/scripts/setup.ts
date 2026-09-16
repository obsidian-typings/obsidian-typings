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
} from './helpers/root.ts';
import {
  generateBranchName,
  getLatestVersion
} from './helpers/version.ts';

const DOCS_DIR = dirname(dirname(toPosixPath(fileURLToPath(import.meta.url))));
const ROOT_DIR = dirname(DOCS_DIR);

async function main(): Promise<void> {
  const CHANNEL_ARG_INDEX = 2;
  const channelArgument = process.argv[CHANNEL_ARG_INDEX] ?? process.env['CURRENT_CHANNEL'] ?? 'public';
  if (channelArgument !== 'public' && channelArgument !== 'catalyst') {
    console.error(`Invalid channel: ${channelArgument}. Use "public" or "catalyst".`);
    process.exit(1);
  }
  const channel = channelArgument;

  // Resolve the release branch
  const latestVersion = await getLatestVersion(channel);
  const latestBranch = generateBranchName({ channel, obsidianVersion: latestVersion });
  console.warn(`Using release branch: ${latestBranch}`);

  // Create temporary worktree
  const temporaryDirectory = toPosixPath(join(toPosixPath(tmpdir()), `obsidian-typings-docs-${channel}`));
  if (existsSync(temporaryDirectory)) {
    console.warn('Removing stale worktree...');
    await execFromRoot(`git worktree remove --force "${temporaryDirectory}"`, { cwd: ROOT_DIR, isQuiet: true, shouldIgnoreExitCode: true });
    await rm(temporaryDirectory, { force: true, recursive: true });
  }

  console.warn(`Creating worktree at ${temporaryDirectory}...`);
  await execFromRoot(
    `git worktree add --detach "${temporaryDirectory}" "${latestBranch}"`,
    { cwd: ROOT_DIR }
  );

  try {
    // Install only obsidian for official .d.ts
    console.warn('Installing obsidian package...');
    await execFromRoot(
      'npm install obsidian --ignore-scripts',
      { cwd: temporaryDirectory, shouldFailIfCalledFromOutsideRoot: false }
    );

    const obsidianDtsPath = join(temporaryDirectory, 'node_modules/obsidian/obsidian.d.ts');
    console.warn(existsSync(obsidianDtsPath) ? 'Official obsidian.d.ts found.' : 'WARNING: obsidian.d.ts not found.');

    // Run the generator pointing at the worktree
    console.warn('Generating API docs...');
    process.env['TYPINGS_ROOT'] = temporaryDirectory;
    process.env['CURRENT_CHANNEL'] = channel;
    await execFromRoot(['jiti', './scripts/generate-api-docs.ts'], { cwd: DOCS_DIR });
  } finally {
    delete process.env['TYPINGS_ROOT'];
    console.warn('Cleaning up worktree...');
    await execFromRoot(`git worktree remove --force "${temporaryDirectory}"`, { cwd: ROOT_DIR, isQuiet: true, shouldIgnoreExitCode: true });
    await rm(temporaryDirectory, { force: true, recursive: true });
  }
}

await main();
