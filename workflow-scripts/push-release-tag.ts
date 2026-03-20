import { writeFile } from 'node:fs/promises';
import { inc } from 'semver';

import { parseBranchSpec } from './helpers/branchSpec.ts';
import {
  editPackageJson,
  editPackageLockJson,
  execFromRoot,
  readPackageJson
} from './helpers/exec.ts';
import {
  annotateTag,
  assertHeadMatches,
  commit,
  getBranchNames
} from './helpers/git.ts';
import { getLatestVersion } from './helpers/version.ts';

const TAG_NAME = 'release-candidate';
const TAG_NAME_BETA = 'release-candidate-beta';

async function main(): Promise<void> {
  await assertHeadMatches(TAG_NAME);

  const tagNames = (await execFromRoot('git tag --points-at HEAD')).split('\n').map((tag) => tag.trim());

  const isBeta = tagNames.includes(TAG_NAME_BETA);

  await execFromRoot(`git tag -d ${TAG_NAME}`);
  await execFromRoot(`git push origin --delete tag ${TAG_NAME}`);

  if (isBeta) {
    await execFromRoot(`git tag -d ${TAG_NAME_BETA}`);
    await execFromRoot(`git push origin --delete tag ${TAG_NAME_BETA}`);
  }

  const branchNames = await getBranchNames('HEAD');
  const branchName = branchNames[0];

  if (branchNames.length !== 1 || !branchName) {
    throw new Error(`Expected 1 branch, got ${String(branchNames.length)}: ${branchNames.join(', ')}`);
  }

  const branchSpec = parseBranchSpec(branchName);

  await execFromRoot('npm install');
  await execFromRoot('npm run build');

  const nextVersion = await updateNpmVersions(branchName, isBeta);

  const zipFileName = `obsidian-typings-${nextVersion}-obsidian-${branchSpec.obsidianVersion}-${branchSpec.channel}.zip`;
  const tags: string[] = [];
  const suffix = isBeta ? '-beta' : '';
  const mainNpmTag = `obsidian-${branchSpec.channel}-${branchSpec.obsidianVersion}${suffix}`;
  tags.push(mainNpmTag);

  const latestVersion = await getLatestVersion(branchSpec.channel);

  if (branchSpec.obsidianVersion === latestVersion) {
    tags.push(`obsidian-${branchSpec.channel}-latest${suffix}`);
    if (branchSpec.channel === 'public') {
      tags.push(`latest${suffix}`);
    }
  }

  await execFromRoot('git restore --source=origin/main --worktree -- ./README.md');
  await releaseNpmPackage(nextVersion, zipFileName, tags);
  await writeOutput({
    isBeta,
    releaseName: `${nextVersion} (${mainNpmTag})`,
    tagName: nextVersion,
    zipFileName
  });
}

async function releaseNpmPackage(nextVersion: string, zipFileName: string, tags: string[]): Promise<void> {
  await execFromRoot('npm publish --tag published-latest');

  for (const tag of tags) {
    await execFromRoot(['npm', 'dist-tag', 'add', `obsidian-typings@${nextVersion}`, tag]);
  }

  await execFromRoot('mkdir build');
  await execFromRoot('cp -r dist build');
  await execFromRoot('cp README.md LICENSE CHANGELOG.md package.json build');
  await execFromRoot(['zip', '-r', zipFileName, '.'], { cwd: 'build' });
}

async function updateNpmVersion(nextVersion: string): Promise<void> {
  await editPackageJson((packageJson) => {
    packageJson.version = nextVersion;
  });

  await editPackageLockJson((packageLockJson) => {
    packageLockJson.version = nextVersion;

    const defaultPackage = packageLockJson.packages?.[''];
    if (defaultPackage) {
      defaultPackage.version = nextVersion;
    }
  });

  await execFromRoot('git add package.json package-lock.json');
  await commit(`chore(release): ${nextVersion}`);
  await execFromRoot('git push');
}

async function updateNpmVersions(branchName: string, isBeta: boolean): Promise<string> {
  await execFromRoot('git fetch origin');
  await execFromRoot('git checkout main --force');
  const packageJson = await readPackageJson();
  if (!packageJson.version) {
    throw new Error('package.json version is not set');
  }
  const nextVersion = isBeta ? inc(packageJson.version, 'preminor', 'beta') : inc(packageJson.version, 'minor');
  if (!nextVersion) {
    throw new Error('Failed to increment version');
  }

  await updateNpmVersion(nextVersion);

  await execFromRoot(`git checkout ${branchName} --force`);
  await updateNpmVersion(nextVersion);

  await annotateTag(nextVersion, nextVersion);
  await execFromRoot('git push origin --follow-tags');

  return nextVersion;
}

async function writeOutput(obj: Record<string, unknown>): Promise<void> {
  const githubOutput = process.env['GITHUB_OUTPUT'] ?? '';
  if (!githubOutput) {
    console.warn('GITHUB_OUTPUT is not set');
    return;
  }

  const lines = Object.entries(obj).map(([key, value]) => `${key}=${String(value)}`);
  await writeFile(githubOutput, lines.join('\n'), 'utf-8');
}

await main();
