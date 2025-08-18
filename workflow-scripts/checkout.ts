import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';
import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';

import { generateBranchName } from './modules/branchSpec.ts';
import { getLatestVersion } from './modules/version.ts';

await wrapCliTask(async () => {
  // eslint-disable-next-line no-magic-numbers
  let targetBranch = process.argv[2];
  // eslint-disable-next-line no-magic-numbers
  const withScripts = process.argv[3] === '--with-scripts';
  if (!targetBranch) {
    throw new Error('Usage: bun ./workflow-scripts/checkout.ts <targetBranch> [--with-scripts]');
  }

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
});
