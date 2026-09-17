import { compare } from 'semver';

import type { BranchSpec } from './branchSpec.ts';

/**
 * Refuses a new branch that would not come after the latest one in the order {@link selectLatestBranch} uses.
 */
export function assertNewBranchFollowsLatest(newBranchSpec: BranchSpec, latestBranchSpec: BranchSpec): void {
  const { channel: newVersionChannel, obsidianVersion: newVersion } = newBranchSpec;
  const { channel: latestVersionChannel, obsidianVersion: latestVersion } = latestBranchSpec;

  if (compare(newVersion, latestVersion) < 0) {
    throw new Error(`New Obsidian version ${newVersion} is older than the latest version ${latestVersion} ${latestVersionChannel}.`);
  }

  if (compare(newVersion, latestVersion) === 0) {
    if (newVersionChannel === latestVersionChannel) {
      throw new Error(`New Obsidian version ${newVersion} is the same as the latest version ${latestVersion} ${latestVersionChannel}.`);
    }

    if (newVersionChannel === 'catalyst') {
      throw new Error(`New Obsidian version ${newVersion} is the same as the latest version ${latestVersion} ${latestVersionChannel}.`);
    }
  }
}

/**
 * Picks the release branch a new one is cut from: the later of the latest `catalyst` and the latest `public`.
 *
 * For one and the same Obsidian version the public branch is cut AFTER the catalyst one, so on a tie
 * public is the later of the two, and it is the branch a new release has to be based on. The comparison
 * is therefore `<= 0`, not `< 0`: an equal pair used to fall into the `else` and pick catalyst, the older
 * of the two. {@link assertNewBranchFollowsLatest} encodes the very same ordering -- it refuses a new
 * `catalyst` at the latest version and lets a new `public` through -- so this used to contradict its own guard.
 */
export function selectLatestBranch(latestCatalystVersion: string, latestPublicVersion: string): BranchSpec {
  if (compare(latestCatalystVersion, latestPublicVersion) <= 0) {
    return { channel: 'public', obsidianVersion: latestPublicVersion };
  }

  return { channel: 'catalyst', obsidianVersion: latestCatalystVersion };
}
