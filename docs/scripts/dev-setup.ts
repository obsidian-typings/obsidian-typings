/**
 * Sets up the docs development environment.
 *
 * Creates a git worktree on the latest public release branch,
 * installs dependencies, builds types, copies docs/ from main, and generates API docs.
 *
 * Usage: npm run dev:setup [-- public|catalyst]
 * Then:  cd ../obsidian-typings-docs-dev/docs && npm run dev
 */

import { existsSync } from 'node:fs';
import {
  cp,
  rm
} from 'node:fs/promises';
import {
  dirname,
  resolve
} from 'node:path';
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
const ROOT_DIR = resolve(DOCS_DIR, '..');
const WORKTREE_DIR = resolve(ROOT_DIR, '../obsidian-typings-docs-dev');

async function main(): Promise<void> {
  const CHANNEL_ARG_INDEX = 2;
  const channelArg = process.argv[CHANNEL_ARG_INDEX] ?? 'public';
  if (channelArg !== 'public' && channelArg !== 'catalyst') {
    console.error(`Invalid channel: ${channelArg}. Use "public" or "catalyst".`);
    process.exit(1);
  }
  const channel = channelArg;
  const latestVersion = await getLatestVersion(channel);
  const latestBranch = generateBranchName({ channel, obsidianVersion: latestVersion });
  console.warn(`Using release branch: ${latestBranch}`);

  // Create or update worktree (detached to avoid locking the branch)
  if (existsSync(WORKTREE_DIR)) {
    console.warn(`Worktree already exists at ${WORKTREE_DIR}, updating...`);
    await execFromRoot(`git -C "${WORKTREE_DIR}" checkout --detach ${latestBranch}`);
  } else {
    console.warn(`Creating worktree at ${WORKTREE_DIR}...`);
    await execFromRoot(`git worktree add --detach "${WORKTREE_DIR}" ${latestBranch}`);
  }

  // Remove stale docs/ from worktree before build (avoids spellcheck conflicts)
  const worktreeDocsDir = resolve(WORKTREE_DIR, 'docs');
  await rm(worktreeDocsDir, { force: true, recursive: true });

  // Install root dependencies and build types
  console.warn('Installing root dependencies...');
  await execFromRoot('npm ci', { cwd: WORKTREE_DIR });
  console.warn('Building types...');
  await execFromRoot('npm run build', { cwd: WORKTREE_DIR });

  // Copy docs/ from main into the worktree
  await cp(DOCS_DIR, worktreeDocsDir, { recursive: true });

  // Install docs dependencies
  console.warn('Installing docs dependencies...');
  await execFromRoot('npm ci', { cwd: worktreeDocsDir });

  // Generate API docs
  console.warn('Generating API docs...');
  await execFromRoot('npm run setup', { cwd: worktreeDocsDir });

  console.warn(`\nDocs dev environment ready at ${WORKTREE_DIR}/docs`);
  console.warn('To start the dev server:');
  console.warn(`  cd "${WORKTREE_DIR}/docs" && npm run dev`);
}

await main();
