import { writeFile } from 'node:fs/promises';
import { inc } from 'semver';

import {
  type BranchSpec,
  parseBranchSpec
} from './helpers/branchSpec.ts';
import {
  editPackageJson,
  editPackageLockJson,
  execFromRoot
} from './helpers/exec.ts';
import {
  annotateTag,
  commit,
  getBranchNames
} from './helpers/git.ts';
import {
  getLatestWrapperPackageName,
  getScopedPackageName
} from './helpers/npm.ts';
import { getLatestVersion } from './helpers/version.ts';

/*
 * npm validates the published manifest against the provenance statement that trusted publishing attaches,
 * rejecting the publish when they disagree. The generated wrapper manifests below are built from scratch, so
 * they have to carry the same repository as the package.json the release branch publishes.
 */
const REPOSITORY = {
  type: 'git',
  url: 'git+https://github.com/obsidian-typings/obsidian-typings.git'
};

async function main(): Promise<void> {
  const isBeta = process.env['IS_BETA'] === 'true';

  const branchNames = await getBranchNames('HEAD');
  const branchName = branchNames[0];

  if (branchNames.length !== 1 || !branchName) {
    throw new Error(`Expected 1 branch, got ${String(branchNames.length)}: ${branchNames.join(', ')}`);
  }

  // Checkout the branch so we're not in detached HEAD state (CI checks out the commit SHA, leaving us detached)
  await execFromRoot(`git checkout -B ${branchName} --track origin/${branchName}`);

  const branchSpec = parseBranchSpec(branchName);

  await execFromRoot('npm install');
  await execFromRoot('npm run build');

  const nextVersion = await updateNpmVersions(branchSpec, isBeta);
  const scopedTagName = buildScopedTagName(branchSpec, nextVersion);

  const scopedPackageName = getScopedPackageName(branchSpec);
  const zipFileName = `obsidian-typings-${nextVersion}-obsidian-${branchSpec.obsidianVersion}-${branchSpec.channel}.zip`;

  const latestVersion = await getLatestVersion(branchSpec.channel);
  const isLatest = branchSpec.obsidianVersion === latestVersion;

  await releaseNpmPackage(nextVersion, zipFileName, scopedPackageName);

  // Use main README for the wrapper packages and zip artifact
  await execFromRoot('git restore --source=origin/main --worktree -- ./README.md');

  if (isLatest) {
    const latestWrapperName = getLatestWrapperPackageName(branchSpec.channel);
    const wrapperVersion = await getNextWrapperVersion(latestWrapperName, isBeta);
    await updateLatestWrapper(branchSpec.channel, scopedPackageName, nextVersion, wrapperVersion);
    if (branchSpec.channel === 'public') {
      await updateLegacyWrapper(wrapperVersion);
    }
  }

  await writeOutput({
    isBeta,
    releaseName: `${nextVersion} (${scopedPackageName})`,
    tagName: scopedTagName,
    zipFileName
  });
}

function buildScopedTagName(branchSpec: BranchSpec, releaseVersion: string): string {
  return `obsidian-${branchSpec.channel}-${branchSpec.obsidianVersion}-v${releaseVersion}`;
}

async function releaseNpmPackage(_nextVersion: string, zipFileName: string, scopedPackageName: string): Promise<void> {
  // Publish as scoped package
  await editPackageJson((packageJson) => {
    packageJson.name = scopedPackageName;
  });

  // No `--access public`, and no `--provenance`. Every package this script publishes already exists and is
  // already public, so npm carries the existing access forward and the flag only re-asserts what is already
  // true -- while counting as a package-access change, the category npm now gates behind an interactive 2FA
  // challenge. Trusted publishing attaches provenance on its own, so the flag is redundant there too. A
  // package that does *not* exist yet cannot be published from CI at all; see `bootstrap-new-package.ts`.
  await execFromRoot('npm publish');

  // Restore original name for zip artifact
  await editPackageJson((packageJson) => {
    packageJson.name = 'obsidian-typings';
  });

  await execFromRoot('mkdir build');
  await execFromRoot('cp -r dist build');
  await execFromRoot('cp README.md LICENSE CHANGELOG.md package.json build');
  await execFromRoot(['zip', '-r', zipFileName, '.'], { cwd: 'build' });
}

async function updateLatestWrapper(channel: 'catalyst' | 'public', scopedPackageName: string, scopedVersion: string, wrapperVersion: string): Promise<void> {
  const wrapperName = getLatestWrapperPackageName(channel);

  // Create a temporary directory for the wrapper package
  await execFromRoot('mkdir -p .wrapper-tmp');

  const wrapperPackageJson = {
    dependencies: {
      [scopedPackageName]: `^${scopedVersion}`
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
    repository: REPOSITORY,
    type: 'module',
    types: './types.d.cts',
    version: wrapperVersion
  };

  await execFromRoot(`cat > .wrapper-tmp/package.json << 'EOF'\n${JSON.stringify(wrapperPackageJson, null, 2)}\nEOF`);
  await execFromRoot('cp README.md .wrapper-tmp/README.md');
  await execFromRoot(`echo 'export type * from "${scopedPackageName}";' > .wrapper-tmp/types.d.mts`);
  await execFromRoot(`echo 'export type * from "${scopedPackageName}";' > .wrapper-tmp/types.d.cts`);
  await execFromRoot(`echo 'export * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.d.mts`);
  await execFromRoot(`echo 'export * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.d.cts`);
  await execFromRoot(`echo 'module.exports = require("${scopedPackageName}/implementations");' > .wrapper-tmp/implementations.cjs`);
  await execFromRoot(`echo 'export * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.mjs`);

  await execFromRoot('npm publish', { cwd: '.wrapper-tmp' });
  await execFromRoot('rm -rf .wrapper-tmp');
}

async function updateLegacyWrapper(version: string): Promise<void> {
  const latestWrapperName = getLatestWrapperPackageName('public');

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
    repository: REPOSITORY,
    type: 'module',
    types: './types.d.cts',
    version
  };

  await execFromRoot(`cat > .legacy-tmp/package.json << 'EOF'\n${JSON.stringify(legacyPackageJson, null, 2)}\nEOF`);
  await execFromRoot('cp README.md .legacy-tmp/README.md');
  await execFromRoot(`echo 'export type * from "${latestWrapperName}";' > .legacy-tmp/types.d.mts`);
  await execFromRoot(`echo 'export type * from "${latestWrapperName}";' > .legacy-tmp/types.d.cts`);
  await execFromRoot(`echo 'export * from "${latestWrapperName}/implementations";' > .legacy-tmp/implementations.d.mts`);
  await execFromRoot(`echo 'export * from "${latestWrapperName}/implementations";' > .legacy-tmp/implementations.d.cts`);
  await execFromRoot(`echo 'module.exports = require("${latestWrapperName}/implementations");' > .legacy-tmp/implementations.cjs`);
  await execFromRoot(`echo 'export * from "${latestWrapperName}/implementations";' > .legacy-tmp/implementations.mjs`);

  await execFromRoot('npm publish', { cwd: '.legacy-tmp' });
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

async function getNextWrapperVersion(packageName: string, isBeta: boolean): Promise<string> {
  const currentVersion = (await execFromRoot(`npm view ${packageName} version`, { isQuiet: true })).trim();
  const nextVersion = isBeta ? inc(currentVersion, 'preminor', 'beta') : inc(currentVersion, 'minor');
  if (!nextVersion) {
    throw new Error(`Failed to increment wrapper version for ${packageName} (current: ${currentVersion})`);
  }
  return nextVersion;
}

async function updateNpmVersions(branchSpec: BranchSpec, isBeta: boolean): Promise<string> {
  const currentVersion = (await execFromRoot('node -p "require(\'./package.json\').version"', { isQuiet: true })).trim();
  const nextVersion = isBeta ? inc(currentVersion, 'preminor', 'beta') : inc(currentVersion, 'minor');
  if (!nextVersion) {
    throw new Error('Failed to increment version');
  }

  await updateNpmVersion(nextVersion);

  const scopedTagName = buildScopedTagName(branchSpec, nextVersion);
  await annotateTag(scopedTagName, nextVersion);
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
