import { execFromRoot } from './exec.ts';

function gitWithBotUser() {
  const USER_NAME = 'github-actions[bot]';
  const USER_EMAIL = '41898282+github-actions[bot]@users.noreply.github.com';
  return `git -c user.name="${USER_NAME}" -c user.email="${USER_EMAIL}"`;
}

export async function commit(message: string): Promise<void> {
  await execFromRoot(`${gitWithBotUser()} commit -m "${message}"`);
}

export async function getBranchNames(rev: string): Promise<string[]> {
  const branchesStr = await execFromRoot(`git branch -r --points-at ${rev}`);
  const branches = branchesStr.split('\n').map((branch) => branch.trim().replace('origin/', ''));
  return branches;
}

export async function annotateTag(tag: string, message: string): Promise<void> {
  await execFromRoot(`${gitWithBotUser()} tag -a ${tag} -m "${message}"`);
}
