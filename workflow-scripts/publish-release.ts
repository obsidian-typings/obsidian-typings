import { writeFile } from 'node:fs/promises';
import { inc } from 'semver';

import type { BranchSpec } from './helpers/branchSpec.ts';
import type { PackageRegistryState } from './helpers/npm.ts';
import type {
  WrapperChangelogSectionOptions,
  WrapperDependency
} from './helpers/wrapperChangelog.ts';

import { parseBranchSpec } from './helpers/branchSpec.ts';
import {
  CHANGELOG_FILE_NAME,
  composeChangelogSection,
  getBreakingChangeSubjects,
  getChangelogEntries,
  prependChangelogSection,
  readChangelog,
  RELEASE_NOTES_FILE_NAME,
  resolveCommitRange,
  writeChangelog,
  writeReleaseNotes
} from './helpers/changelog.ts';
import {
  annotateTag,
  commit,
  getBranchNames
} from './helpers/git.ts';
import { assertRunningInGitHubActions } from './helpers/githubActions.ts';
import {
  editPackageJson,
  editPackageLockJson,
  toJson
} from './helpers/json.ts';
import {
  getLatestWrapperPackageName,
  getPackageRegistryState,
  getScopedPackageName,
  getTrustedPublisherInstructions,
  hasTrustedPublisher,
  LEGACY_PACKAGE_NAME,
  REPOSITORY
} from './helpers/npm.ts';
import { execFromRoot } from './helpers/root.ts';
import { getLatestVersion } from './helpers/version.ts';
import {
  composeWrapperChangelogSection,
  readPublishedChangelog
} from './helpers/wrapperChangelog.ts';

/**
 * What {@link updateLatestWrapper} needs.
 */
interface LatestWrapperOptions extends WrapperReleaseOptions {
  /** The channel whose `-latest` wrapper is published. */
  readonly channel: BranchSpec['channel'];

  /** The wrapper version currently published, whose changelog this one extends. */
  readonly currentWrapperVersion: string;

  /** The wrapper version this run publishes. */
  readonly wrapperVersion: string;
}

/**
 * What {@link updateLegacyWrapper} needs.
 */
interface LegacyWrapperOptions extends WrapperReleaseOptions {
  /** The legacy package version currently published, whose changelog this one extends. */
  readonly currentLegacyVersion: string;

  /** The version this run publishes, which is the public `-latest` wrapper's own. */
  readonly version: string;
}

/**
 * What {@link updateNpmVersions} records about the version it bumped to.
 */
interface NpmVersionsUpdate {
  /** The breaking-change subjects of the release, for the wrappers' changelogs. */
  readonly breakingChangeSubjects: readonly string[];

  /** The version the per-version package is about to publish. */
  readonly nextVersion: string;
}

/**
 * What a wrapper's changelog entry needs to know about the versioned release this run published.
 */
interface WrapperReleaseOptions {
  /** The breaking-change subjects of that release, as `updateChangelog` collected them. */
  readonly breakingChangeSubjects: readonly string[];

  /** The versioned package that release published, which every wrapper ends up resolving to. */
  readonly scopedDependency: WrapperDependency;

  /** The tag that release wrote, which names its GitHub release page. */
  readonly tagName: string;
}

/**
 * Refuses the run when npm will not let this workflow publish one of the packages it is about to publish.
 *
 * Every package published from here needs its own trusted publisher attached -- one `npm trust github` call,
 * or the npmjs.com form it writes the same record as, once per package name. It is the half of the
 * new-package hand-back that gets skipped, and skipping it is invisible until the publish: `npm publish` asks
 * for an OIDC credential, is refused, silently carries on without one, and the registry answers the
 * unauthorized `PUT` with `404 Not Found` on a package that plainly exists. {@link hasTrustedPublisher} asks
 * that same question up front.
 *
 * It asks it the only way CI can. `npm trust list` reads the configuration directly, but it is authenticated,
 * and this job holds no npm credential at all -- that is the entire point of trusted publishing. So the OIDC
 * exchange stays the predicate here, and `readTrustedPublisherState` is for the local scripts.
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

function getNextWrapperVersion(packageName: string, currentVersion: string, isBeta: boolean): string {
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

/** The version npm currently serves for `packageName`, which a wrapper's next version and changelog build on. */
async function getPublishedVersion(packageName: string): Promise<string> {
  return (await execFromRoot(`npm view ${packageName} version`, { isQuiet: true })).trim();
}

async function main(): Promise<void> {
  /*
   * First, because everything below it is irreversible and none of it belongs in a developer checkout. The
   * branch resolution underneath used to stand in for this by accident -- on a developer branch no remote ref
   * points at HEAD, so it threw -- but that check exists to work out which release branch CI dispatched
   * against, and it passes on the one checkout where a hand-run would do the most damage: a release branch
   * whose tip equals origin's, which is the ordinary state right after `npm run checkout`.
   */
  assertRunningInGitHubActions(
    'publish-release',
    'bump the version on this branch, commit and tag it, publish every package of this release to npm, and'
      + ' push the commit and the tag'
  );

  const isBeta = process.env['IS_BETA'] === 'true';

  /*
   * Which release branch CI dispatched against -- the workflow checks out a commit SHA, leaving the runner
   * detached, so the branch has to be recovered from the refs that point at it. Exactly one is expected, and
   * neither other answer is actionable: none means the commit is on no published branch, several means
   * nothing here can choose between them.
   */
  const branchNames = await getBranchNames('HEAD');
  const branchName = branchNames[0];

  if (branchNames.length !== 1 || !branchName) {
    throw new Error(
      branchNames.length === 0
        ? 'No remote branch points at HEAD, so there is no release branch to publish from.'
        : `Expected exactly 1 remote branch pointing at HEAD, got ${String(branchNames.length)}: ${branchNames.join(', ')}.`
    );
  }

  // Checkout the branch so we're not in detached HEAD state (CI checks out the commit SHA, leaving us detached)
  await execFromRoot(`git checkout -B ${branchName} --track origin/${branchName}`);

  const branchSpec = parseBranchSpec(branchName);

  const latestVersion = await getLatestVersion(branchSpec.channel);
  const isLatest = branchSpec.obsidianVersion === latestVersion;

  // Before anything this run cannot take back. The version bump's commit and tag now stay local until the
  // publish that spends the version has succeeded (see `pushRelease`), so a refused publish costs nothing
  // but the run -- and this preflight is what makes even that cheap. It sits above `npm install` and
  // `npm run build`, not merely above the publish, because there is no reason to spend six minutes building
  // an artifact that was never going to be published, and because a bare `E404` does not say that the cause
  // is a form nobody filled in. It is not a hypothetical: it is what both dispatches did on 2026-09-14,
  // when the bump was pushed first and each attempt burned a minor version on top of the wasted build.
  await assertCanPublish(branchSpec, isLatest);

  await execFromRoot('npm install');
  await execFromRoot('npm run build');

  const {
    breakingChangeSubjects,
    nextVersion
  } = await updateNpmVersions(branchSpec, isBeta);
  const scopedTagName = buildScopedTagName(branchSpec, nextVersion);

  const scopedPackageName = getScopedPackageName(branchSpec);
  const zipFileName = `obsidian-typings-${nextVersion}-obsidian-${branchSpec.obsidianVersion}-${branchSpec.channel}.zip`;

  await publishScopedPackage(scopedPackageName);

  // The moment the version stops being reversible, and therefore the moment the refs describing it belong in
  // the remote. Everything below this line -- the zip, both wrappers, the GitHub release -- can fail without
  // costing a version number: the wrappers carry their own, derived from what is already published.
  await pushRelease(nextVersion, scopedPackageName, scopedTagName);

  /*
   * Everything below this line reads `README.md` off the worktree, and every one of them wants main's -- the
   * full docs -- rather than the per-version one `readmeGenerator.ts` writes onto a release branch from
   * `README.template.md`. Only the scoped package published above carries the branch README, which is the
   * whole reason this restore sits here rather than further up.
   *
   * Its position is load-bearing, and has already been silently wrong once. `6f8c1725` moved this call below
   * the publish so the versioned package would keep the branch README, and the zip went with it: back then
   * the zip was packed inside the same function as the publish, so one move changed two artifacts. The
   * comment naming the zip was written by that same commit, so main's README was always the intent and only
   * the code disagreed. Every release zip from 2026-05-15 until this fix shipped the branch one.
   */
  await execFromRoot('git restore --source=origin/main --worktree -- ./README.md');

  await packZipArtifact(zipFileName);

  if (isLatest) {
    const latestWrapperName = getLatestWrapperPackageName(branchSpec.channel);
    const currentWrapperVersion = await getPublishedVersion(latestWrapperName);
    const wrapperVersion = getNextWrapperVersion(latestWrapperName, currentWrapperVersion, isBeta);
    const wrapperRelease: WrapperReleaseOptions = {
      breakingChangeSubjects,
      scopedDependency: { name: scopedPackageName, version: nextVersion },
      tagName: scopedTagName
    };

    await updateLatestWrapper({
      ...wrapperRelease,
      channel: branchSpec.channel,
      currentWrapperVersion,
      wrapperVersion
    });

    if (branchSpec.channel === 'public') {
      await updateLegacyWrapper({
        ...wrapperRelease,
        currentLegacyVersion: await getPublishedVersion(LEGACY_PACKAGE_NAME),
        version: wrapperVersion
      });
    }
  }

  await writeOutput({
    isBeta,
    releaseName: `${nextVersion} (${scopedPackageName})`,
    releaseNotesFileName: RELEASE_NOTES_FILE_NAME,
    tagName: scopedTagName,
    zipFileName
  });
}

/** Packs the release artifact the GitHub release attaches. Runs after the publish, and costs nothing if it fails. */
async function packZipArtifact(zipFileName: string): Promise<void> {
  await execFromRoot('mkdir build');
  await execFromRoot('cp -r dist build');
  await execFromRoot('cp README.md LICENSE CHANGELOG.md package.json build');
  await execFromRoot(['zip', '-r', zipFileName, '.'], { cwd: 'build' });
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

/** Publishes the per-version package. This is the call that spends `package.json`'s version for good. */
async function publishScopedPackage(scopedPackageName: string): Promise<void> {
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
}

/**
 * Pushes the version-bump commit and its tag, once the publish that spends that version has succeeded.
 *
 * This ordering is the whole of the fix: `npm publish` ships whatever `package.json` holds, so the bump
 * cannot move *after* the publish -- but the half that is hard to undo can. Committing and tagging locally
 * and pushing here means a refused publish leaves nothing but refs this runner discards, where it used to
 * leave a spent minor version and a tag pointing at a release that never happened. Both dispatches on
 * 2026-09-14 did exactly that.
 *
 * The failure this leaves is the mirror image, and is narrower by everything that used to sit between the
 * bump and the publish -- an `npm install`, a full build, and the publish itself. It is also the direction
 * that cannot be allowed to pass quietly: npm holds a version that no branch records, and a runner's
 * checkout does not outlive its job, so the commit and the tag are gone with it. Hence the diagnosis rather
 * than the raw git error, and hence a reconstruction that assumes nothing survived.
 */
async function pushRelease(nextVersion: string, scopedPackageName: string, scopedTagName: string): Promise<void> {
  try {
    await execFromRoot('git push origin --follow-tags');
  } catch (error) {
    throw new Error(
      [
        `${scopedPackageName}@${nextVersion} IS PUBLISHED, but pushing the commit and tag that record it failed.`,
        '',
        'An npm version cannot be republished, and this runner\'s checkout goes away with the job, taking the',
        `commit and the tag ${scopedTagName} with it. Re-dispatching without fixing this publishes nothing: the`,
        `run reads the branch's unchanged package.json, computes ${nextVersion} again, and npm answers E403.`,
        '',
        'Reconstruct both refs by hand, from a fresh checkout of the release branch:',
        '',
        `  npm version ${nextVersion} --no-git-tag-version`,
        `  git commit -am "chore(release): ${nextVersion}"`,
        `  git tag -a ${scopedTagName} -m "${nextVersion}"`,
        '  git push origin --follow-tags'
      ].join('\n'),
      { cause: error }
    );
  }
}

/**
 * Writes this release's section into `CHANGELOG.md`, and the same section out for the GitHub release body.
 *
 * Both destinations get one generated section, deliberately. They are the two places a consumer looks -- the
 * published tarball and the releases page -- and until 2026-09-23 neither held anything: the tarball shipped
 * a three-line stub pointing at a `main` file last touched in March, and the release body was empty because
 * `publish-release.yml` handed `softprops/action-gh-release` neither a `body` nor `generate_release_notes`.
 * Generating twice would be two chances to disagree about one release.
 *
 * The previous release's tag is derived from the version this branch currently holds, which is exactly the
 * version the previous run published. See `resolveCommitRange` for what happens on a branch's first release,
 * where no such tag exists.
 */
async function updateChangelog(branchSpec: BranchSpec, currentVersion: string, nextVersion: string): Promise<string[]> {
  const commitRange = await resolveCommitRange(buildScopedTagName(branchSpec, currentVersion));
  const breakingChangeSubjects = await getBreakingChangeSubjects(commitRange);
  const section = composeChangelogSection({
    breakingChangeSubjects,
    entries: await getChangelogEntries(commitRange),
    version: nextVersion
  });

  await writeReleaseNotes(section);
  await writeChangelog(prependChangelogSection(await readChangelog(), section));
  return breakingChangeSubjects;
}

async function updateLatestWrapper(options: LatestWrapperOptions): Promise<void> {
  const {
    channel,
    currentWrapperVersion,
    scopedDependency,
    wrapperVersion
  } = options;
  const wrapperName = getLatestWrapperPackageName(channel);
  const scopedPackageName = scopedDependency.name;

  // Create a temporary directory for the wrapper package
  await execFromRoot('mkdir -p .wrapper-tmp');

  const wrapperPackageJson = {
    dependencies: {
      [scopedPackageName]: `^${scopedDependency.version}`
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
  await writeWrapperChangelog('.wrapper-tmp', wrapperName, currentWrapperVersion, {
    ...options,
    resolutionChain: [scopedDependency],
    version: wrapperVersion
  });
  await execFromRoot(`echo 'export type * from "${scopedPackageName}";' > .wrapper-tmp/types.d.mts`);
  await execFromRoot(`echo 'export type * from "${scopedPackageName}";' > .wrapper-tmp/types.d.cts`);
  await execFromRoot(`echo 'export * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.d.mts`);
  await execFromRoot(`echo 'export * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.d.cts`);
  await execFromRoot(`echo 'module.exports = require("${scopedPackageName}/implementations");' > .wrapper-tmp/implementations.cjs`);
  await execFromRoot(`echo 'export * from "${scopedPackageName}/implementations";' > .wrapper-tmp/implementations.mjs`);

  await publishPackage(wrapperName, '.wrapper-tmp');
  await execFromRoot('rm -rf .wrapper-tmp');
}

async function updateLegacyWrapper(options: LegacyWrapperOptions): Promise<void> {
  const {
    currentLegacyVersion,
    scopedDependency,
    version
  } = options;
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
  await writeWrapperChangelog('.legacy-tmp', LEGACY_PACKAGE_NAME, currentLegacyVersion, {
    ...options,
    resolutionChain: [{ name: latestWrapperName, version }, scopedDependency]
  });
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

  // `CHANGELOG.md` rides in the release commit rather than in one of its own: it describes exactly the
  // version this commit sets, and `package.json`'s `files` array publishes it, so a release whose tarball
  // carried a changelog the branch did not would be the same lie in the other direction.
  await execFromRoot(`git add package.json package-lock.json ${CHANGELOG_FILE_NAME}`);
  await commit(`chore(release): ${nextVersion}`);
}

/**
 * Records the next version in the working tree, LOCALLY -- bumped, committed and tagged, nothing pushed.
 *
 * `npm publish` ships what `package.json` holds, so this has to run before the publish. Nothing it does
 * reaches the remote: {@link pushRelease} does that afterwards, and only if the publish went through.
 */
async function updateNpmVersions(branchSpec: BranchSpec, isBeta: boolean): Promise<NpmVersionsUpdate> {
  const currentVersion = (await execFromRoot('node -p "require(\'./package.json\').version"', { isQuiet: true })).trim();
  const nextVersion = isBeta ? inc(currentVersion, 'preminor', 'beta') : inc(currentVersion, 'minor');
  if (!nextVersion) {
    throw new Error('Failed to increment version');
  }

  // Strictly BEFORE the release commit, and the ordering is the whole of it: the range ends at `HEAD`, so a
  // changelog generated after the bump would open every release with its own `chore(release):` line.
  const breakingChangeSubjects = await updateChangelog(branchSpec, currentVersion, nextVersion);

  await updateNpmVersion(nextVersion);

  const scopedTagName = buildScopedTagName(branchSpec, nextVersion);
  await annotateTag(scopedTagName, nextVersion);

  return { breakingChangeSubjects, nextVersion };
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

/**
 * Writes a wrapper's `CHANGELOG.md` into the folder it is published from: the file its currently published
 * version carries, with this version's section on top. See `helpers/wrapperChangelog.ts` for what the section
 * says and why.
 */
async function writeWrapperChangelog(
  folderName: string,
  packageName: string,
  currentVersion: string,
  sectionOptions: WrapperChangelogSectionOptions
): Promise<void> {
  const section = composeWrapperChangelogSection(sectionOptions);
  const changelog = prependChangelogSection(await readPublishedChangelog(packageName, currentVersion), section);
  await writeFile(`${folderName}/${CHANGELOG_FILE_NAME}`, changelog, 'utf-8');
}

await main();
