import { writeFile } from 'node:fs/promises';
import { inc } from 'semver';

import type { BranchSpec } from './helpers/branchSpec.ts';
import type { PackageRegistryState } from './helpers/npm.ts';

import { parseBranchSpec } from './helpers/branchSpec.ts';
import {
  editPackageJson,
  editPackageLockJson,
  execFromRoot,
  toJson
} from './helpers/exec.ts';
import {
  annotateTag,
  commit,
  getBranchNames
} from './helpers/git.ts';
import {
  getLatestWrapperPackageName,
  getPackageRegistryState,
  getScopedPackageName,
  getTrustedPublisherInstructions,
  hasTrustedPublisher,
  LEGACY_PACKAGE_NAME,
  REPOSITORY
} from './helpers/npm.ts';
import { getLatestVersion } from './helpers/version.ts';

/**
 * Refuses the run when npm will not let this workflow publish one of the packages it is about to publish.
 *
 * Every package published from here needs its own trusted publisher attached on npmjs.com -- a form somebody
 * fills in once per package name, and the half of the new-package hand-back that gets skipped. Skipping it is
 * invisible until the publish: `npm publish` asks for an OIDC credential, is refused, silently carries on
 * without one, and the registry answers the unauthorized `PUT` with `404 Not Found` on a package that plainly
 * exists. {@link hasTrustedPublisher} asks that same question up front.
 *
 * All three names are checked, not just the first. The versioned package publishes first, so it is the one
 * that failed on 2026-09-14 -- but a `-latest` wrapper missing its publisher would fail *after* the versioned
 * package had already gone out, which is the expensive half of this run to redo.
 *
 * A name the check cannot answer for is reported and allowed through: see {@link hasTrustedPublisher} for why
 * only a definite "no" stops the run.
 */
async function assertCanPublish(branchSpec: BranchSpec, isLatest: boolean): Promise<void> {
  const packageNames = getPackageNamesToPublish(branchSpec, isLatest);
  const refused: string[] = [];
  const unknown: string[] = [];

  for (const packageName of packageNames) {
    const isAllowed = await hasTrustedPublisher(packageName);

    if (isAllowed === null) {
      unknown.push(packageName);
    } else if (!isAllowed) {
      refused.push(packageName);
    }
  }

  if (unknown.length > 0) {
    console.warn(
      `Could not check the trusted publisher for ${unknown.join(', ')} -- publishing anyway, and the publish itself will say.`
    );
  }

  if (refused.length === 0) {
    return;
  }

  const reasons: string[] = [];

  for (const packageName of refused) {
    reasons.push(await describeMissingPublishRight(packageName));
  }

  throw new Error([
    `npm refused to issue this workflow a publish credential for ${refused.join(', ')}.`,
    '',
    'Nothing has been changed by this run: no version bump, no tag, no publish. Fix the cause below and',
    'dispatch it again.',
    ...reasons
  ].join('\n'));
}

function buildScopedTagName(branchSpec: BranchSpec, releaseVersion: string): string {
  return `obsidian-${branchSpec.channel}-${branchSpec.obsidianVersion}-v${releaseVersion}`;
}

/**
 * Names the reason this workflow cannot publish a package, by asking the registry which of the two steps of
 * the hand-back is missing.
 *
 * The two are not distinguishable from npm's own answer -- a refused publish and an unclaimed name produce
 * the same `E404` -- but they are trivially distinguishable from the registry afterwards, and they have
 * completely different remedies. Shared by the preflight and by a publish that failed anyway, so an operator
 * meets one wording rather than two.
 */
async function describeMissingPublishRight(packageName: string): Promise<string> {
  let registryState: PackageRegistryState;

  try {
    registryState = await getPackageRegistryState(packageName);
  } catch {
    return `\n${packageName}: the registry could not be asked what it knows about this name, so the cause is unclear.`;
  }

  if (registryState === 'missing') {
    return [
      '',
      `${packageName} does not exist on npm at all.`,
      '',
      'CI cannot create it: a trusted publisher can only be attached to a package that already exists, and',
      'this workflow holds no credential capable of claiming a name. Claim it locally with',
      '`npm run bootstrap-new-package`, attach its publisher, then dispatch this workflow again.'
    ].join('\n');
  }

  return [
    '',
    `${packageName} exists on npm, so what is missing is its trusted publisher.`,
    getTrustedPublisherInstructions(packageName)
  ].join('\n');
}

async function getNextWrapperVersion(packageName: string, isBeta: boolean): Promise<string> {
  const currentVersion = (await execFromRoot(`npm view ${packageName} version`, { isQuiet: true })).trim();
  const nextVersion = isBeta ? inc(currentVersion, 'preminor', 'beta') : inc(currentVersion, 'minor');
  if (!nextVersion) {
    throw new Error(`Failed to increment wrapper version for ${packageName} (current: ${currentVersion})`);
  }
  return nextVersion;
}

/** Every package name this run will publish, in the order it will publish them. */
function getPackageNamesToPublish(branchSpec: BranchSpec, isLatest: boolean): string[] {
  const packageNames = [getScopedPackageName(branchSpec)];

  if (isLatest) {
    packageNames.push(getLatestWrapperPackageName(branchSpec.channel));

    if (branchSpec.channel === 'public') {
      packageNames.push(LEGACY_PACKAGE_NAME);
    }
  }

  return packageNames;
}

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

  const latestVersion = await getLatestVersion(branchSpec.channel);
  const isLatest = branchSpec.obsidianVersion === latestVersion;

  // Before anything this run cannot take back. `updateNpmVersions()` below commits the version bump, pushes
  // it, and pushes an annotated tag -- all of which happen BEFORE the first `npm publish`, so a publish that
  // was never going to be allowed still costs a minor version and leaves a tag pointing at a release that
  // does not exist. That is not a hypothetical: it is what both dispatches did on 2026-09-14. Asking first is
  // what makes the failure free, and it is also why this sits above `npm install` and `npm run build` rather
  // than merely above the publish -- there is no reason to spend six minutes building an artifact that cannot
  // be published.
  await assertCanPublish(branchSpec, isLatest);

  await execFromRoot('npm install');
  await execFromRoot('npm run build');

  const nextVersion = await updateNpmVersions(branchSpec, isBeta);
  const scopedTagName = buildScopedTagName(branchSpec, nextVersion);

  const scopedPackageName = getScopedPackageName(branchSpec);
  const zipFileName = `obsidian-typings-${nextVersion}-obsidian-${branchSpec.obsidianVersion}-${branchSpec.channel}.zip`;

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

/**
 * Publishes the package prepared in `cwd` (the repository root when omitted), diagnosing a failure rather
 * than passing npm's own message through.
 *
 * npm's output is already in the log above whatever this throws; what it does not say is what to do about it.
 * The one cause worth naming is a missing publish right, because npm reports it as `E404` against a name that
 * plainly exists -- it answers an *unauthorized* `PUT` with **404**, not 401, since it will not confirm the
 * existence of something you may not read -- and that reads as a registry bug to whoever is looking at it.
 */
async function publishPackage(packageName: string, cwd?: string): Promise<void> {
  try {
    await execFromRoot('npm publish', cwd === undefined ? {} : { cwd });
  } catch (error) {
    throw new Error(
      `Publishing ${packageName} failed.${await describeMissingPublishRight(packageName)}`,
      { cause: error }
    );
  }
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
  await publishPackage(scopedPackageName);

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

  await execFromRoot(`cat > .wrapper-tmp/package.json << 'EOF'\n${toJson(wrapperPackageJson)}\nEOF`);
  await execFromRoot('cp README.md .wrapper-tmp/README.md');
  await execFromRoot(`echo 'export type * from "${scopedPackageName}";' > .wrapper-tmp/types.d.mts`);
  await execFromRoot(`echo 'export type * from "${scopedPackageName}";' > .wrapper-tmp/types.d.cts`);
  await execFromRoot(`echo 'export * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.d.mts`);
  await execFromRoot(`echo 'export * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.d.cts`);
  await execFromRoot(`echo 'module.exports = require("${scopedPackageName}/implementations");' > .wrapper-tmp/implementations.cjs`);
  await execFromRoot(`echo 'export * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.mjs`);

  await publishPackage(wrapperName, '.wrapper-tmp');
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
    name: LEGACY_PACKAGE_NAME,
    repository: REPOSITORY,
    type: 'module',
    types: './types.d.cts',
    version
  };

  await execFromRoot(`cat > .legacy-tmp/package.json << 'EOF'\n${toJson(legacyPackageJson)}\nEOF`);
  await execFromRoot('cp README.md .legacy-tmp/README.md');
  await execFromRoot(`echo 'export type * from "${latestWrapperName}";' > .legacy-tmp/types.d.mts`);
  await execFromRoot(`echo 'export type * from "${latestWrapperName}";' > .legacy-tmp/types.d.cts`);
  await execFromRoot(`echo 'export * from "${latestWrapperName}/implementations";' > .legacy-tmp/implementations.d.mts`);
  await execFromRoot(`echo 'export * from "${latestWrapperName}/implementations";' > .legacy-tmp/implementations.d.cts`);
  await execFromRoot(`echo 'module.exports = require("${latestWrapperName}/implementations");' > .legacy-tmp/implementations.cjs`);
  await execFromRoot(`echo 'export * from "${latestWrapperName}/implementations";' > .legacy-tmp/implementations.mjs`);

  await publishPackage(LEGACY_PACKAGE_NAME, '.legacy-tmp');
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
