import { setTimeout as sleep } from 'node:timers/promises';

import { generateBranchName } from './helpers/branchSpec.ts';
import { checkout } from './helpers/checkout.ts';
import {
  execFromRoot,
  readPackageJson
} from './helpers/exec.ts';
import { commit } from './helpers/git.ts';
import { getLatestVersion } from './helpers/version.ts';

async function main(): Promise<void> {
  for (const channel of ['public', 'catalyst'] as const) {
    const latestBranchVersion = await getLatestVersion(channel);
    const latestBranch = generateBranchName({ channel, obsidianVersion: latestBranchVersion });
    await checkout(latestBranch, true);

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

async function getLatestObsidianVersion(): Promise<string> {
  // This workflow runs hourly, so it is exposed to transient registry failures often enough that
  // they show up as red runs -- a single `read ECONNRESET` mid-handshake failed the whole job.
  return await withRetry('fetch the latest obsidian version', async () => {
    const response = await fetch('https://registry.npmjs.org/obsidian/latest');

    if (!response.ok) {
      throw new Error(`npm registry returned ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    if (typeof json !== 'object' || json === null || Array.isArray(json)) {
      throw new Error('Invalid response from npm registry for obsidian');
    }

    return json['version'] as string;
  });
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
