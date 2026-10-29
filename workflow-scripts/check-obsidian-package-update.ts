import { execFromRoot } from '@mnaoumov/typescript-dev-toolkit/root';
import { setTimeout as sleep } from 'node:timers/promises';

import type {
  BranchSpec,
  Channel
} from './helpers/branch-spec.ts';
import type { PackageRegistryState } from './helpers/npm.ts';
import type { SkippedRelease } from './helpers/obsidian-releases.ts';

import { selectLatestBranch } from './helpers/base-branch.ts';
import { generateBranchName } from './helpers/branch-spec.ts';
import { restoreWorkflowScripts } from './helpers/checkout.ts';
import { commit } from './helpers/git.ts';
import { assertRunningInGitHubActions } from './helpers/github-actions.ts';
import { fileIssueOnce } from './helpers/github-issues.ts';
import { readPackageJson } from './helpers/json.ts';
import { getScopedPackageName } from './helpers/npm.ts';
import {
  fetchChangelogUrl,
  fetchLatestAppVersions,
  planReleaseBranches
} from './helpers/obsidian-releases.ts';
import { generateMainReadme } from './helpers/readme-generator.ts';
import { cutReleaseBranch } from './helpers/release-branch.ts';
import { getLatestVersion } from './helpers/version.ts';

/**
 * Cuts a release branch for every Obsidian version that has none, and files what it cannot finish.
 *
 * This is the half the workflow was missing. It used to watch the npm `obsidian` API package alone, which is
 * published far less often than the app: `1.14.4` stayed its `latest` while the app shipped `1.14.5` public
 * and `1.15.0` catalyst, every three-hourly run logged "no file changes" and went green, and nothing cut a
 * branch for either version until somebody noticed by hand.
 *
 * What it cannot do is claim a new package name on npm, which needs a maintainer's 2FA (see
 * `bootstrap-new-package.ts`), or bring the typings in line with the new build's internals, which is the
 * crawler's job and is run by a maintainer. Both are filed as one issue per branch.
 */
async function cutBranchesForNewObsidianVersions(): Promise<void> {
  const latestAppVersions = await withRetry('fetch the latest Obsidian app versions', fetchLatestAppVersions);
  const latestBranchVersions: Record<Channel, string> = {
    catalyst: await getLatestVersion('catalyst'),
    public: await getLatestVersion('public')
  };

  const plan = planReleaseBranches(latestBranchVersions, latestAppVersions);

  for (const skippedRelease of plan.skipped) {
    await reportSkippedRelease(skippedRelease);
  }

  if (plan.branchesToCut.length === 0) {
    console.log(`Every Obsidian app version has a release branch: public ${latestAppVersions.public}, catalyst ${latestAppVersions.catalyst}.`);
    return;
  }

  for (const branchSpec of plan.branchesToCut) {
    const baseBranchVersions = { ...latestBranchVersions };
    const changelogUrl = await fetchChangelogUrl(branchSpec.obsidianVersion);
    const registryState = await cutReleaseBranch(branchSpec, changelogUrl);
    latestBranchVersions[branchSpec.channel] = branchSpec.obsidianVersion;

    if (registryState === 'released') {
      // `npm run release` exists only on a release branch, which is where `cutReleaseBranch` leaves us.
      await execFromRoot('npm run release');
    } else {
      await reportBranchNeedingPackage(branchSpec, registryState, baseBranchVersions);
    }

    // Opens with `git checkout main`, so it goes after anything that has to run on the new branch.
    await generateMainReadme();
  }
}

async function getLatestObsidianVersion(): Promise<string> {
  // This workflow runs hourly, so it is exposed to transient registry failures often enough that
  // they show up as red runs -- a single `read ECONNRESET` mid-handshake failed the whole job.
  return await withRetry('fetch the latest obsidian version', async () => {
    const response = await fetch('https://registry.npmjs.org/obsidian/latest');

    if (!response.ok) {
      throw new Error(`npm registry returned ${String(response.status)} ${response.statusText}`);
    }

    const json: unknown = await response.json();

    if (typeof json !== 'object' || json === null || Array.isArray(json) || !('version' in json) || typeof json.version !== 'string') {
      throw new Error('Invalid response from npm registry for obsidian');
    }

    return json.version;
  });
}

async function main(): Promise<void> {
  /*
   * This script is unattended automation, not a command: it resets the local release branch onto its remote
   * tip, commits as `github-actions[bot]`, rebases, pushes, and dispatches `publish-release.yml`. Nothing
   * about that is ever wanted in a developer checkout, where the reset could also discard local unpushed
   * commits -- `create-new-release-branch` could be fixed without such a guard precisely because it never
   * touches an existing branch, and this one has to be *on* the branch it commits to.
   */
  assertRunningInGitHubActions(
    'check-obsidian-package-update',
    'switch this checkout onto a release branch, reset that branch onto its remote tip, commit as'
      + ' github-actions[bot], rebase, push, and dispatch a release'
  );

  /*
   * Reconcile `main`'s "Latest <channel> release" rows with the registry before touching anything else.
   *
   * Those rows are written once, by `create-new-release-branch.ts` at the moment a branch is cut -- which is
   * precisely the moment the branch's npm package does NOT exist yet, because claiming it is a manual step
   * handed back to a human. So the row is written without its per-version npm badge and there is nothing that
   * would ever put the badge back: the next `generateMainReadme()` call is the next branch cut, which writes a
   * badge-less row for the NEXT version. Left alone, the badge simply never returns.
   *
   * This is the cheapest place to close that, and it costs nothing when there is nothing to do:
   * `generateMainReadme()` returns before committing when the README it would write is the one already there,
   * so the usual 3-hourly run makes two registry requests and stops. It goes first because it is the only part
   * of this script that wants to be on `main`: the loop below checks out a release branch and stays there.
   */
  await generateMainReadme();

  // Before the npm loop, so a branch cut here is the latest branch that loop checks out.
  await cutBranchesForNewObsidianVersions();

  for (const channel of ['public', 'catalyst'] as const) {
    const latestBranchVersion = await getLatestVersion(channel);
    const latestBranch = generateBranchName({ channel, obsidianVersion: latestBranchVersion });

    /*
     * The branch NAME is chosen by reading the remote refs (`getLatestVersion` lists
     * `origin/release/obsidian-<channel>/*`), so the branch CONTENT has to come from the same place. The bare
     * `git checkout "<branch>"` this replaced took whatever the LOCAL ref happened to be, and was correct
     * only by accident: a fresh CI clone has no local `release/...` branch, so git's DWIM (do-what-I-mean)
     * shortcut creates one at the remote tip. `-B` states that intent instead of relying on it, and it is safe
     * here only because `assertRunningInGitHubActions()` has ruled out the checkout where the local ref might
     * carry unpushed work of its own. It also fixes the read below -- `readPackageJson()` decides whether an
     * update is needed at all, and was deciding it against that possibly-stale local content.
     *
     * `--track` is insurance rather than a requirement, and the distinction was measured rather than assumed.
     * `npm run release` ends in `git pull origin --rebase`, which needs `branch.<name>.merge` set or it dies
     * with `you must specify a branch on the command line`. Git's default `branch.autoSetupMerge=true` already
     * sets it here, because the start point is a remote-tracking ref -- so on a stock runner `--track` changes
     * nothing. Under `branch.autoSetupMerge=false` it is the difference between that failure and a working
     * pull. Cheap, explicit, and the same shape `publish-release.ts` uses to leave its own detached checkout.
     *
     * `helpers/checkout.ts`'s `checkout()` is deliberately left alone: its remaining caller is
     * `npm run checkout`, where cutting from the local ref is exactly what you want when you have local work.
     */
    await execFromRoot(`git checkout -B "${latestBranch}" --track "origin/${latestBranch}"`);
    await restoreWorkflowScripts();

    const packageJson = await readPackageJson();
    const usedObsidianVersion = packageJson.dependencies?.['obsidian'] ?? '';
    const latestObsidianVersion = await getLatestObsidianVersion();

    if (usedObsidianVersion === latestObsidianVersion) {
      console.log(`Obsidian version matches: ${usedObsidianVersion} === ${latestObsidianVersion}`);
      continue;
    }

    await execFromRoot(`npm install --save-exact obsidian@${latestObsidianVersion}`);
    await execFromRoot('git add package.json package-lock.json');

    const stagedFileNames = await execFromRoot('git diff --staged --name-only', { isQuiet: true });
    const hasChanges = stagedFileNames.trim() !== '';
    if (!hasChanges) {
      console.log(`No file changes after npm install obsidian@${latestObsidianVersion}, skipping release.`);
      continue;
    }

    await commit(`chore: update obsidian API version to ${latestObsidianVersion}`);
    // `npm run release` dispatches the release workflow (publish-release.yml) on main itself.
    await execFromRoot('npm run release');
  }
}

async function reportBranchNeedingPackage(
  branchSpec: BranchSpec,
  registryState: Exclude<PackageRegistryState, 'released'>,
  baseBranchVersions: Readonly<Record<Channel, string>>
): Promise<void> {
  const branchName = generateBranchName(branchSpec);
  const packageName = getScopedPackageName(branchSpec);
  const { channel, obsidianVersion } = branchSpec;
  const baseBranchName = generateBranchName(selectLatestBranch(baseBranchVersions.catalyst, baseBranchVersions.public));

  const packageSteps = registryState === 'missing'
    ? [
      `\`${packageName}\` does not exist on npm yet. CI publishes through trusted publishing, which can only be attached to a`,
      'package that already exists, so the name has to be claimed from a maintainer\'s machine, with 2FA. From `main`:',
      '',
      '```bash',
      'git fetch origin',
      `npm run bootstrap-new-package -- ${obsidianVersion} ${channel}`,
      '```',
      '',
      'It publishes a placeholder, attaches the trusted publisher, and then dispatches the first release.'
    ]
    : [
      `\`${packageName}\` holds only the bootstrap placeholder, so its trusted publisher may not be attached yet. From \`main\`:`,
      '',
      '```bash',
      'git fetch origin',
      `npm run bootstrap-new-package -- ${obsidianVersion} ${channel}`,
      '```',
      '',
      'It skips the claimed name, attaches the publisher if it is missing, and then dispatches the first release.'
    ];

  await fileIssueOnce(
    `Publish the first release of ${branchName}`,
    [
      `Obsidian ${obsidianVersion} ${channel} was released, so \`check-obsidian-package-update\` cut \`${branchName}\` from`
      + ` \`${baseBranchName}\`. Two steps are left that it cannot take by itself.`,
      '',
      '## 1. The npm package',
      '',
      ...packageSteps,
      '',
      '## 2. The typings',
      '',
      `The branch carries \`${baseBranchName}\`'s typings unchanged. Bringing them in line with what changed inside`
      + ` Obsidian ${obsidianVersion} needs a crawler run against that build, which a maintainer runs.`
    ].join('\n')
  );
}

async function reportSkippedRelease(skippedRelease: SkippedRelease): Promise<void> {
  const { channel, obsidianVersion } = skippedRelease.branchSpec;

  await fileIssueOnce(
    `Obsidian ${obsidianVersion} ${channel} has no release branch`,
    [
      `Obsidian ${obsidianVersion} ${channel} was released, but \`check-obsidian-package-update\` could not cut`
      + ` \`${generateBranchName(skippedRelease.branchSpec)}\` for it:`,
      '',
      `> ${skippedRelease.reason}`,
      '',
      'A new release branch is always cut from the latest one, so a version that ranks below it has nothing to be'
      + ' cut from. Decide whether this version needs typings of its own; close this issue if it does not.'
    ].join('\n')
  );
}

async function withRetry<T>(description: string, function_: () => Promise<T>): Promise<T> {
  const ATTEMPTS = 3;
  const BASE_DELAY_IN_MILLISECONDS = 2000;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      return await function_();
    } catch (error) {
      if (attempt === ATTEMPTS) {
        throw error;
      }

      const delayInMilliseconds = BASE_DELAY_IN_MILLISECONDS * attempt;
      console.warn(
        `Failed to ${description} (attempt ${String(attempt)}/${String(ATTEMPTS)}), retrying in ${String(delayInMilliseconds)} ms:`,
        error
      );
      await sleep(delayInMilliseconds);
    }
  }

  throw new Error(`Failed to ${description}`);
}

await main();
