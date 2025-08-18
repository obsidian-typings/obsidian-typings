import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';
import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';
import { compare } from 'semver';

await wrapCliTask(async () => {
  // eslint-disable-next-line no-magic-numbers
  let targetBranch = process.argv[2];
  // eslint-disable-next-line no-magic-numbers
  const withScripts = process.argv[3] === '--with-scripts';
  if (!targetBranch) {
    throw new Error('Usage: bun ./workflow-scripts/checkout.ts <targetBranch> [--with-scripts]');
  }

  if (targetBranch.startsWith('obsidian-public/') || targetBranch.startsWith('obsidian-catalyst/')) {
    targetBranch = `release/${targetBranch}`;
  } else if (targetBranch.startsWith('public/') || targetBranch.startsWith('catalyst/')) {
    targetBranch = `release/obsidian-${targetBranch}`;
  }

  if (targetBranch === 'release/obsidian-public/latest') {
    targetBranch = await getLatestVersion('release/obsidian-public');
  }

  if (targetBranch === 'release/obsidian-catalyst/latest') {
    targetBranch = await getLatestVersion('release/obsidian-catalyst');
  }

  await exec(`git checkout "${targetBranch}"`);
  if (withScripts) {
    await exec('git restore --source=main --worktree -- ./workflow-scripts');
  }
});

async function getLatestVersion(prefix: string): Promise<string> {
  await exec('git fetch');
  const remotePrefix = `origin/${prefix}/`;
  const branches = await exec(`git branch --list --remote "${remotePrefix}*"`);
  const versions = branches.split('\n').filter(Boolean).map((branch) => branch.trim().replace(remotePrefix, ''));
  versions.sort((a, b) => compare(a, b));
  const latestVersion = versions.at(-1);
  if (!latestVersion) {
    throw new Error(`No version found for ${prefix}`);
  }
  return `${prefix}/${latestVersion}`;
}
