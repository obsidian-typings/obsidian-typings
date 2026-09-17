/**
 * @file
 *
 * Tests for how `create-new-release-branch` picks the branch a new release branch is cut from, and for the
 * guard that refuses a new branch which would not come after it.
 *
 * The tie is the case that matters: for one and the same Obsidian version the `public` branch is cut AFTER
 * the `catalyst` one, so an equal pair has to select `public`. A `< 0` comparison once based `1.14.0` on
 * the older of the two `1.13.7` branches, and the guard below it was already encoding the opposite order.
 */

// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import {
  assertNewBranchFollowsLatest,
  selectLatestBranch
} from './baseBranch.ts';
import { generateBranchName } from './branchSpec.ts';

describe('selectLatestBranch', () => {
  it('selects public when both channels are at the same version', () => {
    expect(generateBranchName(selectLatestBranch('1.13.7', '1.13.7'))).toBe('release/obsidian-public/1.13.7');
  });

  it('selects catalyst when catalyst is ahead', () => {
    expect(generateBranchName(selectLatestBranch('1.14.0', '1.13.7'))).toBe('release/obsidian-catalyst/1.14.0');
  });

  it('selects public when public is ahead', () => {
    expect(generateBranchName(selectLatestBranch('1.13.7', '1.14.0'))).toBe('release/obsidian-public/1.14.0');
  });

  it('compares versions semantically rather than as strings', () => {
    expect(generateBranchName(selectLatestBranch('1.9.14', '1.10.0'))).toBe('release/obsidian-public/1.10.0');
  });
});

describe('assertNewBranchFollowsLatest', () => {
  const TIE_BASE = selectLatestBranch('1.13.7', '1.13.7');
  const CATALYST_AHEAD_BASE = selectLatestBranch('1.14.0', '1.13.7');

  it('accepts a new catalyst at a later version than a tie', () => {
    expect(() => {
      assertNewBranchFollowsLatest({ channel: 'catalyst', obsidianVersion: '1.14.0' }, TIE_BASE);
    }).not.toThrow();
  });

  it('accepts a new public at a later version than a tie', () => {
    expect(() => {
      assertNewBranchFollowsLatest({ channel: 'public', obsidianVersion: '1.14.0' }, TIE_BASE);
    }).not.toThrow();
  });

  it('accepts a new public at the version catalyst is already at', () => {
    expect(() => {
      assertNewBranchFollowsLatest({ channel: 'public', obsidianVersion: '1.14.0' }, CATALYST_AHEAD_BASE);
    }).not.toThrow();
  });

  it('accepts a new catalyst ahead of the latest catalyst', () => {
    expect(() => {
      assertNewBranchFollowsLatest({ channel: 'catalyst', obsidianVersion: '1.15.0' }, CATALYST_AHEAD_BASE);
    }).not.toThrow();
  });

  it('refuses a version older than the latest', () => {
    expect(() => {
      assertNewBranchFollowsLatest({ channel: 'catalyst', obsidianVersion: '1.13.0' }, TIE_BASE);
    }).toThrow('New Obsidian version 1.13.0 is older than the latest version 1.13.7 public.');
  });

  it('refuses the same version on the same channel', () => {
    expect(() => {
      assertNewBranchFollowsLatest({ channel: 'public', obsidianVersion: '1.13.7' }, TIE_BASE);
    }).toThrow('New Obsidian version 1.13.7 is the same as the latest version 1.13.7 public.');
  });

  it('refuses a new catalyst at the version public is already at', () => {
    expect(() => {
      assertNewBranchFollowsLatest({ channel: 'catalyst', obsidianVersion: '1.13.7' }, TIE_BASE);
    }).toThrow('New Obsidian version 1.13.7 is the same as the latest version 1.13.7 public.');
  });

  it('refuses a new catalyst at the version catalyst is already at', () => {
    expect(() => {
      assertNewBranchFollowsLatest({ channel: 'catalyst', obsidianVersion: '1.14.0' }, CATALYST_AHEAD_BASE);
    }).toThrow('New Obsidian version 1.14.0 is the same as the latest version 1.14.0 catalyst.');
  });
});
