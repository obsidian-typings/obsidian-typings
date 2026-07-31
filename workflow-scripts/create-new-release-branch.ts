import { compare } from 'semver';

import { generateBranchName } from './helpers/branchSpec.ts';
import { checkout } from './helpers/checkout.ts';
import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import {
  editPackageJson,
  editPackageLockJson,
  execFromRoot
} from './helpers/exec.ts';
import { commit } from './helpers/git.ts';
import {
  generateMainReadme,
  generateReadme
} from './helpers/readmeGenerator.ts';
import { getLatestVersion } from './helpers/version.ts';

exitIfScriptDisabled();

const INITIAL_BRANCH_VERSION = '1.0.0';

async function main(): Promise<void> {
  const newVersion = process.argv[2] ?? '';

  const newVersionChannel = process.argv[3] as 'catalyst' | 'public' | undefined;
  const changelogUrl = process.argv[4] ?? '';
  if (!newVersion || !newVersionChannel || !['catalyst', 'public'].includes(newVersionChannel) || !changelogUrl) {
    throw new Error('Usage: jiti ./workflow-scripts/create-new-release-branch.ts <newVersion> <public|catalyst> <changelogUrl>');
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

  await checkout(latestBranch, true);
  await execFromRoot(`git checkout -b "${newBranch}"`);
  await resetPackageVersion();
  await execFromRoot(`git push -u origin "${newBranch}"`);
  await generateReadme({ channel: newVersionChannel, obsidianVersion: newVersion }, changelogUrl);
  // Publish the new branch right away, so it never sits created-but-unreleased.
  await execFromRoot('npm run release');
  await generateMainReadme();
}

async function resetPackageVersion(): Promise<void> {
  await editPackageJson((packageJson) => {
    packageJson.version = INITIAL_BRANCH_VERSION;
  });

  await editPackageLockJson((packageLockJson) => {
    packageLockJson.version = INITIAL_BRANCH_VERSION;

    const defaultPackage = packageLockJson.packages?.[''];
    if (defaultPackage) {
      defaultPackage.version = INITIAL_BRANCH_VERSION;
    }
  });

  await execFromRoot('git add package.json package-lock.json');

  const hasChanges = (await execFromRoot('git diff --staged --name-only', { isQuiet: true })).trim() !== '';
  if (!hasChanges) {
    console.log(`Version is already ${INITIAL_BRANCH_VERSION}, skipping the reset commit.`);
    return;
  }

  await commit(`chore(release): reset to ${INITIAL_BRANCH_VERSION}`);
}

await main();
