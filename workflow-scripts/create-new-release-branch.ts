import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';
import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';
import { compare } from 'semver';

import { generateBranchName } from './modules/branchSpec.ts';
import { generateReadme } from './modules/readmeGenerator.ts';
import { getLatestVersion } from './modules/version.ts';

await wrapCliTask(async () => {
  // eslint-disable-next-line no-magic-numbers
  const newVersion = process.argv[2] ?? '';
  // eslint-disable-next-line no-magic-numbers
  const newVersionChannel = process.argv[3] as 'catalyst' | 'public' | undefined;
  if (!newVersion || !newVersionChannel || !['catalyst', 'public'].includes(newVersionChannel)) {
    throw new Error('Usage: bun ./workflow-scripts/create-new-release-branch.ts <newVersion> <public|catalyst>');
  }

  const latestPublicVersion = await getLatestVersion('public');
  const latestCatalystVersion = await getLatestVersion('catalyst');

  let latestVersionChannel: 'catalyst' | 'public';
  let latestVersion: string;

  if (compare(latestCatalystVersion, latestPublicVersion) < 0) {
    latestVersionChannel = 'public';
    latestVersion = latestPublicVersion;
  } else {
    latestVersionChannel = 'catalyst';
    latestVersion = latestCatalystVersion;
  }

  if (compare(newVersion, latestVersion) < 0) {
    throw new Error(`New Obsidian version ${newVersion} is older than the latest version ${latestVersion} ${latestVersionChannel}.`);
  }

  if (compare(newVersion, latestVersion) === 0) {
    if (newVersionChannel === latestVersionChannel) {
      throw new Error(`New Obsidian version ${newVersion} is the same as the latest version ${latestVersion} ${latestVersionChannel}.`);
    }

    if (newVersionChannel === 'catalyst') {
      throw new Error(`New Obsidian version ${newVersion} is the same as the latest version ${latestVersion} ${latestVersionChannel}.`);
    }
  }

  const latestBranch = generateBranchName({ channel: latestVersionChannel, obsidianVersion: latestVersion });
  const newBranch = generateBranchName({ channel: newVersionChannel, obsidianVersion: newVersion });

  await exec(`git checkout -b "${latestBranch}" "${newBranch}"`);
  await exec(`git push -u origin "${newBranch}"`);
  await generateReadme({ channel: newVersionChannel, obsidianVersion: newVersion });
});
