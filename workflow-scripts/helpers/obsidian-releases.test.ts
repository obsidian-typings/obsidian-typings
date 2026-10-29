/**
 * @file
 *
 * Tests for reading Obsidian's release feeds and for deciding which release branches a new version calls for.
 *
 * The plan's order is the part that matters: each new branch is cut from the latest one, so `1.14.5` public
 * has to be cut before `1.15.0` catalyst, and a version that can no longer follow the latest branch has to come
 * back as skipped rather than vanish.
 */

// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import { generateBranchName } from './branch-spec.ts';
import {
  findDesktopChangelogUrl,
  parseDesktopReleases,
  planReleaseBranches
} from './obsidian-releases.ts';

describe('parseDesktopReleases', () => {
  it('reads latestVersion as public and beta.latestVersion as catalyst', () => {
    expect(parseDesktopReleases({ beta: { latestVersion: '1.15.0' }, latestVersion: '1.14.5' })).toEqual({ catalyst: '1.15.0', public: '1.14.5' });
  });

  it('refuses a feed without a beta channel', () => {
    expect(() => parseDesktopReleases({ latestVersion: '1.14.5' })).toThrow(/beta\.latestVersion/);
  });
});

describe('findDesktopChangelogUrl', () => {
  const FEED = [
    '<link>https://obsidian.md/changelog/2026-10-22-mobile-v1.15.0/</link>',
    '<link>https://obsidian.md/changelog/2026-10-22-desktop-v1.15.0/</link>',
    '<link>https://obsidian.md/changelog/2026-10-22-desktop-v1.14.5/</link>'
  ].join('\n');

  it('finds the desktop entry, not the mobile one', () => {
    expect(findDesktopChangelogUrl(FEED, '1.15.0')).toBe('https://obsidian.md/changelog/2026-10-22-desktop-v1.15.0/');
  });

  it('does not let a version match a longer one', () => {
    expect(findDesktopChangelogUrl('https://obsidian.md/changelog/2026-10-22-desktop-v1.14.50/', '1.14.5')).toBeNull();
  });

  it('answers null for a version the feed does not carry', () => {
    expect(findDesktopChangelogUrl(FEED, '1.16.0')).toBeNull();
  });
});

describe('planReleaseBranches', () => {
  interface PlannedBranchNames {
    readonly cut: readonly string[];
    readonly skipped: readonly string[];
  }

  function plan(latestBranches: [catalystVersion: string, publicVersion: string], latestApps: [catalystVersion: string, publicVersion: string]): PlannedBranchNames {
    const result = planReleaseBranches(
      { catalyst: latestBranches[0], public: latestBranches[1] },
      { catalyst: latestApps[0], public: latestApps[1] }
    );
    return {
      cut: result.branchesToCut.map((branchSpec) => generateBranchName(branchSpec)),
      skipped: result.skipped.map((skippedRelease) => generateBranchName(skippedRelease.branchSpec))
    };
  }

  it('cuts public 1.14.5 before catalyst 1.15.0', () => {
    expect(plan(['1.14.4', '1.14.4'], ['1.15.0', '1.14.5'])).toEqual({
      cut: ['release/obsidian-public/1.14.5', 'release/obsidian-catalyst/1.15.0'],
      skipped: []
    });
  });

  it('cuts catalyst before public on the same version', () => {
    expect(plan(['1.14.4', '1.14.4'], ['1.14.5', '1.14.5'])).toEqual({
      cut: ['release/obsidian-catalyst/1.14.5', 'release/obsidian-public/1.14.5'],
      skipped: []
    });
  });

  it('cuts nothing when every app version has a branch', () => {
    expect(plan(['1.15.0', '1.14.5'], ['1.15.0', '1.14.5'])).toEqual({ cut: [], skipped: [] });
  });

  it('ignores a beta channel that lags behind the catalyst branches', () => {
    expect(plan(['1.15.0', '1.14.5'], ['1.14.5', '1.14.5'])).toEqual({ cut: [], skipped: [] });
  });

  it('skips a public patch release that catalyst has already moved past', () => {
    expect(plan(['1.15.0', '1.14.5'], ['1.15.0', '1.14.6'])).toEqual({
      cut: [],
      skipped: ['release/obsidian-public/1.14.6']
    });
  });
});
