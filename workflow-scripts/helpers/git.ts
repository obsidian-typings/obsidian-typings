import { execFromRoot } from './root.ts';

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
  const branchesStr = await execFromRoot(`git branch -r --points-at ${rev}`);
  const branches = branchesStr
    .split('\n')
    .filter((branch) => !branch.includes(' -> '))
    .map((branch) => branch.trim().replace(/^origin\//, ''));
  return branches.filter((branch) => branch !== '');
}

function gitWithBotUser(): string {
  const USER_NAME = 'github-actions[bot]';
  const USER_EMAIL = '41898282+github-actions[bot]@users.noreply.github.com';
  return `git -c user.name="${USER_NAME}" -c user.email="${USER_EMAIL}"`;
}
