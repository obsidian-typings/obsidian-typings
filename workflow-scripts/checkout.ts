import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';
import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';

await wrapCliTask(async () => {
  // eslint-disable-next-line no-magic-numbers
  const targetBranch = process.argv[2];
  // eslint-disable-next-line no-magic-numbers
  const withScripts = process.argv[3] === '--with-scripts';
  if (!targetBranch) {
    throw new Error('Usage: bun ./workflow-scripts/checkout.ts <targetBranch> [--with-scripts]');
  }
  await exec(`git checkout "${targetBranch}"`);
  if (withScripts) {
    await exec('git restore --source=main --worktree -- ./workflow-scripts');
  }
});
