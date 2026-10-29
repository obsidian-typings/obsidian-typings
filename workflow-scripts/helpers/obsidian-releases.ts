/**
 * @file
 *
 * What Obsidian itself has released, and which release branches that calls for.
 *
 * `check-obsidian-package-update` used to watch the npm `obsidian` API package and nothing else. That package
 * is published far less often than the app -- `1.14.4` stayed its `latest` while the app shipped `1.14.5`
 * public and `1.15.0` catalyst -- so every run was green and the repository fell two versions behind without a
 * single red mark. The app's own release feed is what says a new version exists; this file reads it.
 */

import { compare } from 'semver';

import type {
  BranchSpec,
  Channel
} from './branch-spec.ts';

import {
  assertNewBranchFollowsLatest,
  selectLatestBranch
} from './base-branch.ts';

/**
 * The feed the desktop app's own updater reads: `latestVersion` is the public build, `beta.latestVersion` the
 * catalyst one. Public and catalyst builds only -- nothing here may ever reach an early-access build.
 */
export const DESKTOP_RELEASES_URL = 'https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/desktop-releases.json';

/**
 * Obsidian's changelog feed, which carries one link per release, e.g. `/changelog/2026-10-22-desktop-v1.14.5/`.
 * The date in that link is the only part a branch's README needs that the version alone does not give.
 */
export const CHANGELOG_FEED_URL = 'https://obsidian.md/changelog.xml';

/**
 * Where a README points when the feed carries no entry for its version yet. The index page lists every release,
 * so the link is less precise but never dead.
 */
export const CHANGELOG_INDEX_URL = 'https://obsidian.md/changelog/';

/**
 * The newest app version on each channel.
 */
export type LatestAppVersions = Readonly<Record<Channel, string>>;

/**
 * The release branches to cut, in the order to cut them, and the versions that cannot get one.
 */
export interface ReleaseBranchPlan {
  readonly branchesToCut: readonly BranchSpec[];
  readonly skipped: readonly SkippedRelease[];
}

/**
 * An app version that has no release branch and cannot be given one automatically, with the reason.
 */
export interface SkippedRelease {
  readonly branchSpec: BranchSpec;
  readonly reason: string;
}

/**
 * Finds the desktop changelog page for a version, falling back to the changelog index.
 *
 * A failed feed read falls back too: the link is the only thing it decides, and a branch with a less precise
 * link is better than no branch.
 *
 * @param version - The Obsidian version.
 * @returns The changelog URL.
 */
export async function fetchChangelogUrl(version: string): Promise<string> {
  try {
    const response = await fetch(CHANGELOG_FEED_URL);
    if (!response.ok) {
      throw new Error(`${CHANGELOG_FEED_URL} returned ${String(response.status)} ${response.statusText}`);
    }

    const changelogUrl = findDesktopChangelogUrl(await response.text(), version);
    if (changelogUrl !== null) {
      return changelogUrl;
    }

    console.warn(`${CHANGELOG_FEED_URL} has no desktop entry for ${version}, linking ${CHANGELOG_INDEX_URL} instead.`);
  } catch (error) {
    console.warn(`Could not read ${CHANGELOG_FEED_URL}, linking ${CHANGELOG_INDEX_URL} instead:`, error);
  }

  return CHANGELOG_INDEX_URL;
}

/**
 * Reads the newest public and catalyst versions from Obsidian's desktop release feed.
 *
 * @returns The newest version on each channel.
 */
export async function fetchLatestAppVersions(): Promise<LatestAppVersions> {
  const response = await fetch(DESKTOP_RELEASES_URL);
  if (!response.ok) {
    throw new Error(`${DESKTOP_RELEASES_URL} returned ${String(response.status)} ${response.statusText}`);
  }

  return parseDesktopReleases(await response.json());
}

/**
 * Finds the desktop changelog link for a version in the changelog feed.
 *
 * The mobile entry for the same version is deliberately not matched: the typings follow the desktop build.
 *
 * @param feed - The changelog feed's text.
 * @param version - The Obsidian version.
 * @returns The changelog URL, or `null` when the feed has none.
 */
export function findDesktopChangelogUrl(feed: string, version: string): null | string {
  const escapedVersion = version.replaceAll('.', String.raw`\.`);
  const regExp = new RegExp(String.raw`https://obsidian\.md/changelog/\d{4}-\d{2}-\d{2}-desktop-v${escapedVersion}/`);
  return regExp.exec(feed)?.[0] ?? null;
}

/**
 * Parses `desktop-releases.json`.
 *
 * @param json - The parsed feed.
 * @returns The newest version on each channel.
 */
export function parseDesktopReleases(json: unknown): LatestAppVersions {
  if (!isRecord(json) || typeof json['latestVersion'] !== 'string' || !isRecord(json['beta']) || typeof json['beta']['latestVersion'] !== 'string') {
    throw new Error(`Unexpected shape of ${DESKTOP_RELEASES_URL}: expected latestVersion and beta.latestVersion.`);
  }

  return {
    catalyst: json['beta']['latestVersion'],
    public: json['latestVersion']
  };
}

/**
 * Decides which release branches the newest app versions call for, and in which order to cut them.
 *
 * A channel needs a branch when its app version is newer than its latest branch. The candidates are cut in the
 * order {@link selectLatestBranch} ranks branches -- by version, and on a tie catalyst before public -- because
 * each new branch is cut from the latest one, and a branch cut out of order would be based on the wrong one or
 * refused by {@link assertNewBranchFollowsLatest}. So `1.14.5` public goes before `1.15.0` catalyst, and the
 * catalyst branch is based on it.
 *
 * A candidate that cannot follow the latest branch -- a public patch release arriving after catalyst has
 * already moved past it -- is skipped with the guard's own message, so the caller can report it. Dropping it
 * silently is how a version goes missing.
 *
 * @param latestBranchVersions - The latest release branch version on each channel.
 * @param latestAppVersions - The newest app version on each channel.
 * @returns The plan.
 */
export function planReleaseBranches(latestBranchVersions: LatestAppVersions, latestAppVersions: LatestAppVersions): ReleaseBranchPlan {
  const candidates: BranchSpec[] = [];

  for (const channel of ['catalyst', 'public'] as const) {
    if (compare(latestAppVersions[channel], latestBranchVersions[channel]) > 0) {
      candidates.push({ channel, obsidianVersion: latestAppVersions[channel] });
    }
  }

  candidates.sort((a, b) => compare(a.obsidianVersion, b.obsidianVersion) || (a.channel === b.channel ? 0 : (a.channel === 'catalyst' ? -1 : 1)));

  const branchVersions = { ...latestBranchVersions };
  const branchesToCut: BranchSpec[] = [];
  const skipped: SkippedRelease[] = [];

  for (const candidate of candidates) {
    try {
      assertNewBranchFollowsLatest(candidate, selectLatestBranch(branchVersions.catalyst, branchVersions.public));
    } catch (error) {
      skipped.push({ branchSpec: candidate, reason: error instanceof Error ? error.message : String(error) });
      continue;
    }

    branchesToCut.push(candidate);
    branchVersions[candidate.channel] = candidate.obsidianVersion;
  }

  return { branchesToCut, skipped };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
