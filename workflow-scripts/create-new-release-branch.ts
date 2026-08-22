import { compare } from 'semver';

import type { BranchSpec } from './helpers/branchSpec.ts';

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
  doesPackageExist,
  getScopedPackageName
} from './helpers/npm.ts';
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
  const newBranchSpec: BranchSpec = { channel: newVersionChannel, obsidianVersion: newVersion };
  const newBranch = generateBranchName(newBranchSpec);

  await checkout(latestBranch, true);
  await execFromRoot(`git checkout -b "${newBranch}"`);
  await resetPackageVersion();
  await execFromRoot(`git push -u origin "${newBranch}"`);
  await generateReadme(newBranchSpec, changelogUrl);

  // A new Obsidian version means a package name npm has never seen, and CI cannot create one: it publishes
  // through trusted publishing, which is configured per package and so requires the package to already
  // exist. Dispatching the release here would burn a version number on a run that cannot succeed, so stop
  // and hand the one step that needs a human back to the human.
  const packageName = getScopedPackageName(newBranchSpec);
  if (!await doesPackageExist(packageName)) {
    await generateMainReadme();
    printBootstrapRequired(packageName, newBranchSpec);
    return;
  }

  // Publish the new branch right away, so it never sits created-but-unreleased.
  await execFromRoot('npm run release');
  await generateMainReadme();
}

function printBootstrapRequired(packageName: string, branchSpec: BranchSpec): void {
  console.log([
    '',
    `Branch created, but ${packageName} does not exist on npm yet, so the release was NOT dispatched.`,
    '',
    'Claim the name and attach its trusted publisher first:',
    '',
    `  npm run bootstrap-new-package -- ${branchSpec.obsidianVersion} ${branchSpec.channel}`,
    '',
    'That script publishes a placeholder and prints what to enter on npmjs.com. Once the trusted publisher',
    'is saved, release the branch with `npm run release`.',
    ''
  ].join('\n'));
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
