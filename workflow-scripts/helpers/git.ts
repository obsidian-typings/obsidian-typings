import { execFromRoot } from './root.ts';

export async function annotateTag(tag: string, message: string): Promise<void> {
  await execFromRoot(`${gitWithBotUser()} tag -a ${tag} -m "${message}"`);
}

export async function commit(message: string): Promise<void> {
  await execFromRoot(`${gitWithBotUser()} commit -m "${message}"`);
}

/**
 * The remote branches pointing at `rev`, with the `origin/` prefix stripped.
 *
 * Blank entries are dropped, so "no remote branch points here" is an EMPTY array. Without that, splitting an
 * empty output yields `['']` -- one entry, falsy -- and a caller counting branches is told there is exactly
 * one, whose name it then has to discover is blank. The single caller reported that as
 * `Expected 1 branch, got 1:` with nothing after the colon.
 */
export async function getBranchNames(rev: string): Promise<string[]> {
  const branchesStr = await execFromRoot(`git branch -r --points-at ${rev}`);
  const branches = branchesStr.split('\n').map((branch) => branch.trim().replace('origin/', ''));
  return branches.filter((branch) => branch !== '');
}

function gitWithBotUser(): string {
  const USER_NAME = 'github-actions[bot]';
  const USER_EMAIL = '41898282+github-actions[bot]@users.noreply.github.com';
  return `git -c user.name="${USER_NAME}" -c user.email="${USER_EMAIL}"`;
}
