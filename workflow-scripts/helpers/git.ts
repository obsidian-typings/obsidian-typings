import { execFromRoot } from '@mnaoumov/typescript-dev-toolkit/root';

/**
 * Runs one git command and resolves to its output. `execFromRoot` in production; a recorder in the tests.
 */
export type GitRunner = (command: string) => Promise<string>;

export async function annotateTag(tag: string, message: string): Promise<void> {
  await execFromRoot(`${gitWithBotUser()} tag -a ${tag} -m "${message}"`);
}

export async function commit(message: string): Promise<void> {
  await execFromRoot(`${gitWithBotUser()} commit -m "${message}"`);
}

/**
 * The remote branches pointing at `rev`, with the leading `origin/` stripped.
 *
 * Two kinds of `git branch -r --points-at` row are not branches, and both are dropped rather than cleaned up:
 *
 * - **Symbolic aliases**, which git prints with its own ` -> ` marker: `origin/HEAD -> origin/main`. Stripping
 *   a prefix off that yields `HEAD -> origin/main`, which is not a name any caller can use. The row appears
 *   only when `rev` sits at the default branch's tip, since that is what `origin/HEAD` names -- so a runner
 *   detached at a release-branch SHA never sees it, and a fresh `actions/checkout` clone usually has no
 *   `origin/HEAD` at all. What it cost there was the count rather than the name: the single caller saw two
 *   entries and threw.
 * - **Blank entries**, so "no remote branch points here" is an EMPTY array. Without that, splitting an empty
 *   output yields `['']` -- one entry, falsy -- and a caller counting branches is told there is exactly one,
 *   whose name it then has to discover is blank. The single caller reported that as `Expected 1 branch, got
 *   1:` with nothing after the colon.
 *
 * The prefix strip is anchored because a branch name may legitimately carry `origin/` further along it
 * (`feature/origin/foo`), and an unanchored first-occurrence replace would eat that one instead.
 */
export async function getBranchNames(rev: string): Promise<string[]> {
  const branchesString = await execFromRoot(`git branch -r --points-at ${rev}`);
  const branches = branchesString
    .split('\n')
    .filter((branch) => !branch.includes(' -> '))
    .map((branch) => branch.trim().replace(/^origin\//, ''));
  return branches.filter((branch) => branch !== '');
}

/**
 * Runs `task`, then puts the checkout back on the branch it started on, whether `task` succeeded or threw.
 *
 * For the scripts a maintainer runs by hand from `main` that can end somewhere else: `bootstrap-new-package`
 * dispatches the release through `offerRelease`, which switches onto the release branch first, because
 * `npm run release` exists only there. Nothing switched back, so a run that released left the checkout on the
 * release branch, and the next tool to touch the repo found it off its default branch. Measured on 2026-10-28:
 * of the two bootstraps run back to back, `1.14.5 public` and `1.15.0 catalyst`, the second left the checkout on
 * `release/obsidian-catalyst/1.15.0`.
 *
 * A detached start is restored by its SHA. The switch back is skipped when nothing moved. A switch back that
 * fails -- a tree the task left dirty -- is reported with the command that finishes it, and never replaces the
 * task's own error: that one says what went wrong, this one only where the checkout was left.
 *
 * Switching back from a release branch to `main` is safe over the `workflow-scripts` copy the release path
 * restores: release branches `.gitignore` `/workflow-scripts`, and git overwrites ignored files on a checkout.
 */
export async function withStartingBranchRestored<T>(task: () => Promise<T>, git: GitRunner = execFromRoot): Promise<T> {
  const startingRef = await getCurrentRef(git);

  let result: T;
  try {
    result = await task();
  } catch (error) {
    try {
      await restoreRef(startingRef, git);
    } catch (restoreError) {
      console.error(restoreError);
    }
    throw error;
  }

  await restoreRef(startingRef, git);
  return result;
}

/**
 * The branch `HEAD` is on, or its SHA when it is detached.
 */
async function getCurrentRef(git: GitRunner): Promise<string> {
  const branchOutput = await git('git branch --show-current');
  const branch = branchOutput.trim();
  if (branch) {
    return branch;
  }

  const shaOutput = await git('git rev-parse HEAD');
  return shaOutput.trim();
}

function gitWithBotUser(): string {
  const USER_NAME = 'github-actions[bot]';
  const USER_EMAIL = '41898282+github-actions[bot]@users.noreply.github.com';
  return `git -c user.name="${USER_NAME}" -c user.email="${USER_EMAIL}"`;
}

async function restoreRef(startingRef: string, git: GitRunner): Promise<void> {
  if (await getCurrentRef(git) === startingRef) {
    return;
  }

  try {
    await git(`git checkout "${startingRef}"`);
  } catch (error) {
    throw new Error(
      `Could not switch the checkout back to ${startingRef}, where this run started. Run \`git checkout "${startingRef}"\` once the tree is clean.`,
      { cause: error }
    );
  }

  console.log(`\nSwitched the checkout back to ${startingRef}, where this run started.`);
}
