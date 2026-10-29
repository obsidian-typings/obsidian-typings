/**
 * @file
 *
 * Tests that `withStartingBranchRestored` puts the checkout back where a hand-run script found it.
 *
 * `bootstrap-new-package` releases through `offerRelease`, which switches onto the release branch. On
 * 2026-10-28 that left the checkout on `release/obsidian-catalyst/1.15.0`, and the next tool to touch the repo
 * found it off `main`. The git runner here is a fake that tracks `HEAD`, so each case states where the task
 * left it and asserts where it ends.
 */

import { noopAsync } from '@mnaoumov/typescript-lib/function';
// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';

import type { GitRunner } from './git.ts';

import { withStartingBranchRestored } from './git.ts';

interface FakeHead {
  // eslint-disable-next-line typescript-dev-toolkit/readonly-interface-members -- The fake's HEAD moves on every checkout, which is what the tests observe.
  branch: string;
  readonly sha: string;
}

interface FakeRepo {
  readonly commands: string[];
  readonly git: GitRunner;
  readonly head: FakeHead;
}

const RELEASE_BRANCH = 'release/obsidian-catalyst/1.15.0';
const DETACHED_SHA = '0123456789abcdef0123456789abcdef01234567';

function createFakeRepo(branch: string, shouldCheckoutFail = false): FakeRepo {
  const commands: string[] = [];
  const head: FakeHead = { branch, sha: DETACHED_SHA };

  function git(command: string): Promise<string> {
    commands.push(command);
    if (command === 'git branch --show-current') {
      return Promise.resolve(`${head.branch}\n`);
    }
    if (command === 'git rev-parse HEAD') {
      return Promise.resolve(`${head.sha}\n`);
    }
    const checkoutMatch = /^git checkout "(?<Ref>.+)"$/.exec(command);
    if (checkoutMatch) {
      if (shouldCheckoutFail) {
        return Promise.reject(new Error('error: Your local changes would be overwritten by checkout'));
      }
      const ref = checkoutMatch.groups?.['Ref'] ?? '';
      head.branch = ref === DETACHED_SHA ? '' : ref;
      return Promise.resolve('');
    }
    return Promise.reject(new Error(`Unexpected command: ${command}`));
  }

  return { commands, git, head };
}

function switchTo(repo: FakeRepo, branch: string): Promise<void> {
  repo.head.branch = branch;
  return noopAsync();
}

describe('withStartingBranchRestored', () => {
  it('switches back to the starting branch when the task released onto another one', async () => {
    vi.spyOn(console, 'log').mockReturnValue(undefined);
    const repo = createFakeRepo('main');

    await withStartingBranchRestored(async () => switchTo(repo, RELEASE_BRANCH), repo.git);

    expect(repo.head.branch).toBe('main');
    expect(repo.commands).toContain('git checkout "main"');
  });

  it('runs no checkout when the task left the checkout where it started', async () => {
    const repo = createFakeRepo('main');

    const result = await withStartingBranchRestored(() => Promise.resolve(42), repo.git);

    expect(result).toBe(42);
    expect(repo.commands.some((command) => command.startsWith('git checkout'))).toBe(false);
  });

  it('switches back when the task threw, and rethrows the task\'s own error', async () => {
    vi.spyOn(console, 'log').mockReturnValue(undefined);
    const repo = createFakeRepo('main');

    await expect(withStartingBranchRestored(async () => {
      await switchTo(repo, RELEASE_BRANCH);
      throw new Error('npm run release failed');
    }, repo.git)).rejects.toThrow('npm run release failed');

    expect(repo.head.branch).toBe('main');
  });

  it('restores a detached start by its SHA', async () => {
    vi.spyOn(console, 'log').mockReturnValue(undefined);
    const repo = createFakeRepo('');

    await withStartingBranchRestored(async () => switchTo(repo, RELEASE_BRANCH), repo.git);

    expect(repo.commands).toContain(`git checkout "${DETACHED_SHA}"`);
    expect(repo.head.branch).toBe('');
  });

  it('fails with the command to finish the switch when the switch back fails', async () => {
    const repo = createFakeRepo('main', true);

    await expect(withStartingBranchRestored(async () => switchTo(repo, RELEASE_BRANCH), repo.git))
      .rejects.toThrow('Run `git checkout "main"` once the tree is clean.');
  });

  it('keeps the task\'s error, not the failed switch back, when both fail', async () => {
    const consoleError = vi.spyOn(console, 'error').mockReturnValue(undefined);
    const repo = createFakeRepo('main', true);

    await expect(withStartingBranchRestored(async () => {
      await switchTo(repo, RELEASE_BRANCH);
      throw new Error('npm run release failed');
    }, repo.git)).rejects.toThrow('npm run release failed');

    expect(consoleError).toHaveBeenCalledOnce();
  });
});
