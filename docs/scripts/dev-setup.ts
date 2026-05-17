/**
 * Sets up the docs development environment.
 *
 * Creates a git worktree on the latest public release branch,
 * copies docs/ from main, installs dependencies, and generates API docs.
 *
 * Usage: npm run dev:setup
 * Then:  npm run dev
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

const DOCS_DIR = dirname(dirname(toPosixPath(fileURLToPath(import.meta.url))));
const ROOT_DIR = resolve(DOCS_DIR, '..');
const WORKTREE_DIR = resolve(ROOT_DIR, '../obsidian-typings-docs-dev');

async function main(): Promise<void> {
  const latestBranch = await getLatestPublicBranch();
  console.warn(`Using release branch: ${latestBranch}`);

  // Create or update worktree
  if (existsSync(WORKTREE_DIR)) {
    console.warn(`Worktree already exists at ${WORKTREE_DIR}, updating...`);
    await execFromRoot(`git -C "${WORKTREE_DIR}" checkout ${latestBranch}`);
  } else {
    console.warn(`Creating worktree at ${WORKTREE_DIR}...`);
    await execFromRoot(`git worktree add "${WORKTREE_DIR}" ${latestBranch}`);
  }

  // Copy docs/ from main into the worktree
  const worktreeDocsDir = resolve(WORKTREE_DIR, 'docs');
  await rm(worktreeDocsDir, { force: true, recursive: true });
  await cp(DOCS_DIR, worktreeDocsDir, { recursive: true });

  // Install dependencies
  console.warn('Installing root dependencies...');
  await execFromRoot('npm ci', { cwd: WORKTREE_DIR });
  console.warn('Installing docs dependencies...');
  await execFromRoot('npm ci', { cwd: worktreeDocsDir });

  // Generate API docs
  console.warn('Generating API docs...');
  await execFromRoot('npm run setup', { cwd: worktreeDocsDir });

  console.warn(`\nDocs dev environment ready at ${WORKTREE_DIR}/docs`);
  console.warn('To start the dev server:');
  console.warn(`  cd "${WORKTREE_DIR}/docs" && npm run dev`);
}

async function getLatestPublicBranch(): Promise<string> {
  await execFromRoot('git fetch origin', { isQuiet: true });
  const branches = await execFromRoot('git branch -r --list "origin/release/obsidian-public/*"', { isQuiet: true });
  const versions = branches
    .split('\n')
    .map((b) => b.trim())
    .filter((b) => b.length > 0)
    .map((b) => b.replace('origin/', ''))
    .sort();

  const latest = versions[versions.length - 1];
  if (!latest) {
    throw new Error('No release/obsidian-public/* branches found');
  }
  return latest;
}

await main();
