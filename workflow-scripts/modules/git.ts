import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';

export async function commit(message: string): Promise<void> {
  const USER_NAME = 'github-actions[bot]';
  const USER_EMAIL = '41898282+github-actions[bot]@users.noreply.github.com';
  await exec(`git -c user.name="${USER_NAME}" -c user.email="${USER_EMAIL}" commit -m "${message}"`);
}

export async function assertHeadMatches(target: string): Promise<void> {
  const head = await resolveCommitHash('HEAD');
  const want = await resolveCommitHash(target);
  if (head !== want) {
    const headBranches = await getBranchNames('HEAD');
    throw new Error(
      `HEAD ${head} (${headBranches.join(', ')}) does not match ${want} (${target}.\nConsider using bun ./workflow-scripts/checkout.ts ${target} --with-scripts`
    );
  }
}

async function resolveCommitHash(target: string): Promise<string> {
  const hash = await exec(`git rev-parse "${target}^{commit}"`);
  return hash.trim();
}

export async function getBranchNames(rev: string): Promise<string[]> {
  const branchesStr = await exec(`git branch --points-at ${rev}`);
  const branches = branchesStr.split('\n').map((branch) => branch.trim().replace('* ', ''));
  return branches;
}
