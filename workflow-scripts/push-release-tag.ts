import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';
import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';
import { writeFile } from 'obsidian-dev-utils/ScriptUtils/NodeModules';
import {
  editPackageJson,
  editPackageLockJson,
  readPackageJson
} from 'obsidian-dev-utils/ScriptUtils/Npm';
import { inc } from 'semver';

import { parseBranchSpec } from './modules/branchSpec.ts';
import {
  annotateTag,
  assertHeadMatches,
  commit,
  getBranchNames
} from './modules/git.ts';
import { getLatestVersion } from './modules/version.ts';

const TAG_NAME = 'release-candidate';
const TAG_NAME_BETA = 'release-candidate-beta';

await wrapCliTask(async () => {
  await assertHeadMatches(TAG_NAME);

  const tagNames = (await exec('git tag --points-at HEAD')).split('\n').map((tag) => tag.trim());

  const isBeta = tagNames.includes(TAG_NAME_BETA);

  await exec(`git tag -d ${TAG_NAME}`);
  await exec(`git push origin --delete tag ${TAG_NAME}`);

  if (isBeta) {
    await exec(`git tag -d ${TAG_NAME_BETA}`);
    await exec(`git push origin --delete tag ${TAG_NAME_BETA}`);
  }

  const branchNames = await getBranchNames('HEAD');
  const branchName = branchNames[0];

  if (branchNames.length !== 1 || !branchName) {
    throw new Error(`Expected 1 branch, got ${String(branchNames.length)}: ${branchNames.join(', ')}`);
  }

  const branchSpec = parseBranchSpec(branchName);

  await exec('npm install');
  await exec('bun run build');

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

  exec(`git restore --source=origin/main --worktree -- ./README.md`);
  await releaseNpmPackage(nextVersion, zipFileName, tags);
  await writeOutput({
    isBeta,
    releaseName: `${nextVersion} (${mainNpmTag})`,
    tagName: nextVersion,
    zipFileName
  });
});

async function releaseNpmPackage(nextVersion: string, zipFileName: string, tags: string[]): Promise<void> {

  await exec('npm publish --tag published-latest');

  for (const tag of tags) {
    await exec(['npm', 'dist-tag', 'add', `obsidian-typings@${nextVersion}`, tag]);
  }

  await exec('mkdir build');
  await exec('cp -r dist build');
  await exec('cp README.md LICENSE CHANGELOG.md package.json build');
  await exec('cd build');
  await exec(`zip -r ${zipFileName} .`);
  await exec('cd ..');
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

  await exec('git add package.json package-lock.json');
  await commit(`chore(release): ${nextVersion}`);
  await exec('git push');
}

async function updateNpmVersions(branchName: string, isBeta: boolean): Promise<string> {
  await exec('git fetch origin');
  await exec('git checkout main');
  const packageJson = await readPackageJson();
  if (!packageJson.version) {
    throw new Error('package.json version is not set');
  }
  const nextVersion = isBeta ? inc(packageJson.version, 'preminor', 'beta') : inc(packageJson.version, 'minor');
  if (!nextVersion) {
    throw new Error('Failed to increment version');
  }

  await updateNpmVersion(nextVersion);

  await exec(`git checkout ${branchName}`);
  await updateNpmVersion(nextVersion);

  await annotateTag(nextVersion, nextVersion);
  await exec('git push origin --follow-tags');

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
