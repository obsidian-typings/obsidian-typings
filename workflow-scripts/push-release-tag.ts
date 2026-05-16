import { writeFile } from 'node:fs/promises';
import { inc } from 'semver';

import { parseBranchSpec } from './helpers/branchSpec.ts';
import {
  editPackageJson,
  editPackageLockJson,
  execFromRoot
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
const SCOPE = '@obsidian-typings';

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

  const scopedPackageName = `${SCOPE}/obsidian-${branchSpec.channel}-${branchSpec.obsidianVersion}`;
  const zipFileName = `obsidian-typings-${nextVersion}-obsidian-${branchSpec.obsidianVersion}-${branchSpec.channel}.zip`;

  const latestVersion = await getLatestVersion(branchSpec.channel);
  const isLatest = branchSpec.obsidianVersion === latestVersion;

  await releaseNpmPackage(nextVersion, zipFileName, scopedPackageName);

  // Use main README for the wrapper packages and zip artifact
  await execFromRoot('git restore --source=origin/main --worktree -- ./README.md');

  if (isLatest) {
    await updateLatestWrapper(branchSpec.channel, scopedPackageName, nextVersion);
    if (branchSpec.channel === 'public') {
      await updateLegacyWrapper(nextVersion);
    }
  }

  await writeOutput({
    isBeta,
    releaseName: `${nextVersion} (${scopedPackageName})`,
    tagName: nextVersion,
    zipFileName
  });
}

async function releaseNpmPackage(_nextVersion: string, zipFileName: string, scopedPackageName: string): Promise<void> {
  // Publish as scoped package
  await editPackageJson((packageJson) => {
    packageJson.name = scopedPackageName;
  });

  await execFromRoot('npm publish --access public');

  // Restore original name for zip artifact
  await editPackageJson((packageJson) => {
    packageJson.name = 'obsidian-typings';
  });

  await execFromRoot('mkdir build');
  await execFromRoot('cp -r dist build');
  await execFromRoot('cp README.md LICENSE CHANGELOG.md package.json build');
  await execFromRoot(['zip', '-r', zipFileName, '.'], { cwd: 'build' });
}

async function updateLatestWrapper(channel: 'catalyst' | 'public', scopedPackageName: string, version: string): Promise<void> {
  const wrapperName = `${SCOPE}/obsidian-${channel}-latest`;

  // Create a temporary directory for the wrapper package
  await execFromRoot('mkdir -p .wrapper-tmp');

  const wrapperPackageJson = {
    dependencies: {
      [scopedPackageName]: `^${version}`
    },
    description: `Latest obsidian-typings for Obsidian ${channel} releases.`,
    exports: {
      '.': {
        import: { types: './types.d.mts' },
        require: { types: './types.d.cts' }
      },
      './implementations': {
        import: { default: './implementations.mjs', types: './implementations.d.mts' },
        require: { default: './implementations.cjs', types: './implementations.d.cts' }
      }
    },
    license: 'MIT',
    main: '',
    name: wrapperName,
    type: 'module',
    types: './types.d.cts',
    version
  };

  await execFromRoot(`cat > .wrapper-tmp/package.json << 'EOF'\n${JSON.stringify(wrapperPackageJson, null, 2)}\nEOF`);
  await execFromRoot('cp README.md .wrapper-tmp/README.md');
  await execFromRoot(`echo 'export type * from "${scopedPackageName}";' > .wrapper-tmp/types.d.mts`);
  await execFromRoot(`echo 'export type * from "${scopedPackageName}";' > .wrapper-tmp/types.d.cts`);
  await execFromRoot(`echo 'export type * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.d.mts`);
  await execFromRoot(`echo 'export type * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.d.cts`);
  await execFromRoot(`echo 'module.exports = require("${scopedPackageName}/implementations");' > .wrapper-tmp/implementations.cjs`);
  await execFromRoot(`echo 'export * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.mjs`);

  await execFromRoot('npm publish --access public', { cwd: '.wrapper-tmp' });
  await execFromRoot('rm -rf .wrapper-tmp');
}

async function updateLegacyWrapper(version: string): Promise<void> {
  const latestWrapperName = `${SCOPE}/obsidian-public-latest`;

  await execFromRoot('mkdir -p .legacy-tmp');

  const legacyPackageJson = {
    dependencies: {
      [latestWrapperName]: `^${version}`
    },
    description: 'TypeScript type definitions for Obsidian\'s internal/unofficial APIs. Wrapper for @obsidian-typings/obsidian-public-latest.',
    exports: {
      '.': {
        import: { types: './types.d.mts' },
        require: { types: './types.d.cts' }
      },
      './implementations': {
        import: { default: './implementations.mjs', types: './implementations.d.mts' },
        require: { default: './implementations.cjs', types: './implementations.d.cts' }
      }
    },
    license: 'MIT',
    main: '',
    name: 'obsidian-typings',
    type: 'module',
    types: './types.d.cts',
    version
  };

  await execFromRoot(`cat > .legacy-tmp/package.json << 'EOF'\n${JSON.stringify(legacyPackageJson, null, 2)}\nEOF`);
  await execFromRoot('cp README.md .legacy-tmp/README.md');
  await execFromRoot(`echo 'export type * from "${latestWrapperName}";' > .legacy-tmp/types.d.mts`);
  await execFromRoot(`echo 'export type * from "${latestWrapperName}";' > .legacy-tmp/types.d.cts`);
  await execFromRoot(`echo 'export type * from "${latestWrapperName}/implementations";' > .legacy-tmp/implementations.d.mts`);
  await execFromRoot(`echo 'export type * from "${latestWrapperName}/implementations";' > .legacy-tmp/implementations.d.cts`);
  await execFromRoot(`echo 'module.exports = require("${latestWrapperName}/implementations");' > .legacy-tmp/implementations.cjs`);
  await execFromRoot(`echo 'export * from "${latestWrapperName}/implementations";' > .legacy-tmp/implementations.mjs`);

  await execFromRoot('npm publish --access public', { cwd: '.legacy-tmp' });
  await execFromRoot('rm -rf .legacy-tmp');
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

async function updateNpmVersions(_branchName: string, isBeta: boolean): Promise<string> {
  const currentVersion = (await execFromRoot('node -p "require(\'./package.json\').version"', { isQuiet: true })).trim();
  const nextVersion = isBeta ? inc(currentVersion, 'preminor', 'beta') : inc(currentVersion, 'minor');
  if (!nextVersion) {
    throw new Error('Failed to increment version');
  }

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
