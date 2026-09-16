import { setTimeout as sleep } from 'node:timers/promises';

import { generateBranchName } from './helpers/branchSpec.ts';
import { restoreWorkflowScripts } from './helpers/checkout.ts';
import {
  execFromRoot,
  readPackageJson
} from './helpers/exec.ts';
import { commit } from './helpers/git.ts';
import { assertRunningInGitHubActions } from './helpers/githubActions.ts';
import { generateMainReadme } from './helpers/readmeGenerator.ts';
import { getLatestVersion } from './helpers/version.ts';

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

    const hasChanges = (await execFromRoot('git diff --staged --name-only', { isQuiet: true })).trim() !== '';
    if (!hasChanges) {
      console.log(`No file changes after npm install obsidian@${latestObsidianVersion}, skipping release.`);
      continue;
    }

    await commit(`chore: update obsidian API version to ${latestObsidianVersion}`);
    // `npm run release` dispatches the release workflow (publish-release.yml) on main itself.
    await execFromRoot('npm run release');
  }
}

async function withRetry<T>(description: string, fn: () => Promise<T>): Promise<T> {
  const ATTEMPTS = 3;
  const BASE_DELAY_IN_MILLISECONDS = 2000;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      return await fn();
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
