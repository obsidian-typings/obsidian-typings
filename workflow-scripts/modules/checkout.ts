import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';
import { generateBranchName } from './branchSpec.ts';
import { getLatestVersion } from './version.ts';

export async function checkout(targetBranch: string, withScripts: boolean): Promise<void> {
  const REG_EXP = /^(?:release\/)?(?:obsidian-)?(?<Channel>public|catalyst)\/(?<Version>\d+\.\d+\.\d+|latest)$/;
  const match = REG_EXP.exec(targetBranch);
  if (!match) {
    throw new Error(`Invalid target branch: ${targetBranch}`);
  }

  const channel = (match.groups?.['Channel'] ?? 'public') as 'catalyst' | 'public';
  let version = match.groups?.['Version'] ?? 'latest';

  if (version === 'latest') {
    version = await getLatestVersion(channel);
  }

  targetBranch = generateBranchName({ channel, obsidianVersion: version });

  await exec(`git checkout "${targetBranch}"`);
  if (withScripts) {
    await exec('git restore --source=main --worktree -- ./workflow-scripts');
  }
}
