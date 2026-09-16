import process from 'node:process';
import { setTimeout as sleep } from 'node:timers/promises';

import { generateBranchName } from './helpers/branchSpec.ts';
import { restoreWorkflowScripts } from './helpers/checkout.ts';
import {
  execFromRoot,
  readPackageJson
} from './helpers/exec.ts';
import { commit } from './helpers/git.ts';
import { getLatestVersion } from './helpers/version.ts';

/*
 * The variable GitHub Actions sets on every runner. Read directly rather than through
 * `helpers/env-toggle.ts`, whose switches are named after the npm script currently running: this file has no
 * npm script, which is half of why running it by hand is always a mistake.
 */
const GITHUB_ACTIONS_ENV_VARIABLE_NAME = 'GITHUB_ACTIONS';

/**
 * Refuses to run anywhere but a GitHub Actions runner.
 *
 * This script is unattended automation, not a command: it resets the local release branch onto its remote
 * tip, commits as `github-actions[bot]`, rebases, pushes, and dispatches `publish-release.yml`. Nothing about
 * that is ever wanted in a developer checkout, where the reset could also discard local unpushed commits --
 * `create-new-release-branch` could be fixed without such a guard precisely because it never touches an
 * existing branch, and this one has to be *on* the branch it commits to.
 *
 * It is a typo detector, not a security boundary: the variable is one `export` away for anyone who means it.
 * That is the right strength -- the only caller that matters is
 * `.github/workflows/check-obsidian-package-update.yml`, and the failure being guarded against is a hand-run,
 * not an attacker.
 */
function assertRunningInGitHubActions(): void {
  if (process.env[GITHUB_ACTIONS_ENV_VARIABLE_NAME]) {
    return;
  }

  throw new Error(
    'check-obsidian-package-update is CI-only and is run by .github/workflows/check-obsidian-package-update.yml.'
      + ' By hand it would switch this checkout onto a release branch, reset that branch onto its remote tip,'
      + ' commit as github-actions[bot], rebase, push, and dispatch a release -- which is why there is no npm'
      + ` script for it. Set ${GITHUB_ACTIONS_ENV_VARIABLE_NAME} only if you mean every one of those.`
  );
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
  assertRunningInGitHubActions();

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
