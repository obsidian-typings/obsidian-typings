/**
 * @file
 *
 * Tests for the changelog section a release publishes.
 *
 * Only the pure half is tested here -- composing a section, prepending it, and turning a commit message into
 * a line -- following `base-branch.test.ts` beside it. The git reads are three flags and a NUL split; what is
 * worth pinning is the shape of what gets published, because it is published and cannot be taken back.
 *
 * The cases that matter are the ones a release actually meets: a default `Merge pull request` subject
 * reaching the first-parent chain (29 of the catalyst branch's 62 merges are one), and a breaking change
 * arriving without a matching entry, which is the `--first-parent` hole this repository is one changed habit
 * away from.
 */

// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import type {
  ChangelogEntry,
  CommitRange,
  CommitRecord
} from './changelog.ts';

import {
  composeChangelogSection,
  createInitialChangelog,
  prependChangelogSection,
  toBreakingChanges,
  toChangelogEntries
} from './changelog.ts';

const REPO = 'https://github.com/obsidian-typings/obsidian-typings';
const BRANCH = 'release/obsidian-public/1.14.4';
const TAG = 'obsidian-public-1.14.4-v1.7.0';
const PREVIOUS_TAG = 'obsidian-public-1.14.4-v1.6.0';
const HASH_A = 'd3c873f0aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const HASH_B = '94e36a9ebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';

const PREVIOUS_RELEASE_RANGE: CommitRange = {
  baseTagName: PREVIOUS_TAG,
  gitRange: `${PREVIOUS_TAG}..HEAD`,
  isPreviousReleaseOfBranch: true
};

const SOURCE_LINES = [
  `**Branch:** [\`${BRANCH}\`](${REPO}/tree/${BRANCH})`,
  '',
  `**Commits:** [\`${PREVIOUS_TAG}...${TAG}\`](${REPO}/compare/${PREVIOUS_TAG}...${TAG})`
];

function compose(breakingChanges: readonly ChangelogEntry[], entries: readonly ChangelogEntry[], commitRange = PREVIOUS_RELEASE_RANGE): string {
  return composeChangelogSection({ branchName: BRANCH, breakingChanges, commitRange, entries, tagName: TAG, version: '1.7.0' });
}

function entry(subject: string, commitHash = HASH_A): ChangelogEntry {
  return { commitHash, subject };
}

function line(subject: string, commitHash = HASH_A): string {
  return `- ${subject} ([\`${commitHash.slice(0, 7)}\`](${REPO}/commit/${commitHash}))`;
}

describe('composeChangelogSection', () => {
  it('writes a flat list when nothing in the release is breaking', () => {
    expect(compose([], [
      entry('fix(plugins): enable/disablePlugin take the user flag', HASH_A),
      entry('fix(app): getSpellcheckLanguages returns null', HASH_B)
    ])).toBe([
      '## 1.7.0',
      '',
      ...SOURCE_LINES,
      '',
      line('fix(plugins): enable/disablePlugin take the user flag', HASH_A),
      line('fix(app): getSpellcheckLanguages returns null', HASH_B)
    ].join('\n'));
  });

  it('partitions the release rather than repeating a breaking entry in both lists', () => {
    expect(compose([entry('fix(app)!: drop getSpellcheckLanguages', HASH_A)], [
      entry('fix(app)!: drop getSpellcheckLanguages', HASH_A),
      entry('fix(plugins): enable/disablePlugin take the user flag', HASH_B)
    ])).toBe([
      '## 1.7.0',
      '',
      ...SOURCE_LINES,
      '',
      '### Breaking changes',
      '',
      line('fix(app)!: drop getSpellcheckLanguages', HASH_A),
      '',
      '### Other changes',
      '',
      line('fix(plugins): enable/disablePlugin take the user flag', HASH_B)
    ].join('\n'));
  });

  it('omits the Other changes heading when every entry is breaking', () => {
    expect(compose([entry('fix(app)!: drop getSpellcheckLanguages')], [entry('fix(app)!: drop getSpellcheckLanguages')])).toBe([
      '## 1.7.0',
      '',
      ...SOURCE_LINES,
      '',
      '### Breaking changes',
      '',
      line('fix(app)!: drop getSpellcheckLanguages')
    ].join('\n'));
  });

  it('still publishes a breaking subject that matches no entry, linked to its own commit', () => {
    // The `--first-parent` hole: a `BREAKING CHANGE:` footer written on a branch commit whose merge subject
    // says something else. Dropping it would lose the change from the one document that exists to announce it.
    expect(compose([entry('fix(app): widen the declared return', HASH_B)], [entry('chore: land the September corrections', HASH_A)])).toBe([
      '## 1.7.0',
      '',
      ...SOURCE_LINES,
      '',
      '### Breaking changes',
      '',
      line('fix(app): widen the declared return', HASH_B),
      '',
      '### Other changes',
      '',
      line('chore: land the September corrections', HASH_A)
    ].join('\n'));
  });

  it('says so when the range is empty, and still names the branch and the range', () => {
    expect(compose([], [])).toBe([
      '## 1.7.0',
      '',
      ...SOURCE_LINES,
      '',
      '- No changes recorded since the previous release.'
    ].join('\n'));
  });

  it('says a branch\'s first release opens at the release it was cut from, not at one of its own', () => {
    const baseTag = 'obsidian-catalyst-1.14.4-v1.2.0';
    const section = compose([], [entry('fix: a correction')], {
      baseTagName: baseTag,
      gitRange: `${baseTag}..HEAD`,
      isPreviousReleaseOfBranch: false
    });

    expect(section).toContain(
      `**Commits:** [\`${baseTag}...${TAG}\`](${REPO}/compare/${baseTag}...${TAG}) -- the first release from this branch, so the range opens at \`${baseTag}\`, the nearest earlier release it was cut from`
    );
  });

  it('links the whole history when no tag is reachable at all', () => {
    const section = compose([], [entry('feat: the first release of anything')], {
      baseTagName: null,
      gitRange: 'HEAD',
      isPreviousReleaseOfBranch: false
    });

    expect(section).toContain(`**Commits:** [every commit up to \`${TAG}\`](${REPO}/commits/${TAG})`);
  });
});

function commit(message: string, commitHash = HASH_A): CommitRecord {
  return { commitHash, message };
}

describe('toChangelogEntries', () => {
  it('takes the subject of an ordinary commit, and keeps its hash', () => {
    expect(toChangelogEntries([commit('fix(app): widen a declared return\n\nA body nobody publishes.\n', HASH_B)]))
      .toEqual([entry('fix(app): widen a declared return', HASH_B)]);
  });

  it('lifts the body onto a default merge subject, rather than publishing a branch name', () => {
    // 29 of the catalyst branch's 62 merges are pre-workflow pull-request merges, and on a first-parent walk
    // the merge IS the entry.
    expect(toChangelogEntries([commit('Merge pull request #17 from obsidian-typings/some-branch\n\nfeat(setting): declare setIcon and iconEl\n')]))
      .toEqual([entry('feat(setting): declare setIcon and iconEl')]);
  });

  it('keeps a merge subject an author wrote, which is this repository\'s usual shape', () => {
    expect(toChangelogEntries([commit('fix(app): widen a declared return\n\nfix(app): widen a declared return\n')]))
      .toEqual([entry('fix(app): widen a declared return')]);
  });

  it('keeps a default merge subject that has no body to lift', () => {
    expect(toChangelogEntries([commit('Merge branch \'main\' into release\n')])).toEqual([entry('Merge branch \'main\' into release')]);
  });

  it('drops this repository\'s own release bookkeeping', () => {
    expect(toChangelogEntries([
      commit('chore(release): 1.10.0\n'),
      commit('chore(release): reset to 1.0.0\n'),
      commit('fix(app): widen a declared return\n', HASH_B)
    ])).toEqual([entry('fix(app): widen a declared return', HASH_B)]);
  });
});

describe('toBreakingChanges', () => {
  it('finds a BREAKING CHANGE: footer in a body', () => {
    expect(toBreakingChanges([commit('fix(app): widen a declared return\n\nBREAKING CHANGE: TS2322 on an assignment that compiled before.\n')]))
      .toEqual([entry('fix(app): widen a declared return')]);
  });

  it('accepts the hyphenated spelling Conventional Commits also allows', () => {
    expect(toBreakingChanges([commit('fix(app): widen a declared return\n\nBREAKING-CHANGE: TS2322.\n')]))
      .toEqual([entry('fix(app): widen a declared return')]);
  });

  it('finds the ! marker on a subject', () => {
    expect(toBreakingChanges([commit('feat(app)!: drop a member\n')])).toEqual([entry('feat(app)!: drop a member')]);
  });

  it('de-duplicates the pair every landing here produces, keeping the first commit git reports', () => {
    // The merge copies the branch commit's message whole, so a non-first-parent read sees both, merge first.
    const message = 'fix(app): widen a declared return\n\nBREAKING CHANGE: TS2322.\n';
    expect(toBreakingChanges([commit(message, HASH_A), commit(message, HASH_B)])).toEqual([entry('fix(app): widen a declared return', HASH_A)]);
  });

  it('says nothing about a commit carrying neither signal', () => {
    expect(toBreakingChanges([commit('fix(app): widen a declared return\n\nA body mentioning no footer.\n')])).toEqual([]);
  });

  it('does not read a mid-body mention as a footer', () => {
    expect(toBreakingChanges([commit('docs: explain what a BREAKING CHANGE: footer is\n\nIt goes at the bottom.\n')]))
      .toEqual([]);
  });
});

describe('prependChangelogSection', () => {
  it('puts the new section under the heading and keeps every older one', () => {
    expect(prependChangelogSection('# CHANGELOG\n\n## 1.10.0\n\n- fix: an older correction\n', '## 1.11.0\n\n- fix: a newer correction'))
      .toBe('# CHANGELOG\n\n## 1.11.0\n\n- fix: a newer correction\n\n## 1.10.0\n\n- fix: an older correction\n');
  });

  it('gives a branch whose changelog holds only the heading a well-formed first section', () => {
    expect(prependChangelogSection(createInitialChangelog(), '## 1.1.0\n\n- feat: the first release of this branch'))
      .toBe('# CHANGELOG\n\n## 1.1.0\n\n- feat: the first release of this branch\n');
  });

  it('gives a file that never had a heading one, rather than writing a headless list', () => {
    expect(prependChangelogSection('', '## 1.1.0\n\n- feat: a release'))
      .toBe('# CHANGELOG\n\n## 1.1.0\n\n- feat: a release\n');
  });

  it('drops the pointer stub every branch cut before 2026-09-23 carries', () => {
    // Carrying it forward would leave a stale pointer sitting underneath the real sections -- the very defect
    // the generator exists to end.
    expect(prependChangelogSection(
      '# CHANGELOG\n\nSee <https://github.com/obsidian-typings/obsidian-typings/blob/main/CHANGELOG.md>\n',
      '## 1.4.0\n\n- fix: a correction'
    )).toBe('# CHANGELOG\n\n## 1.4.0\n\n- fix: a correction\n');
  });

  it('keeps a pre-scoped-package section, whose heading is not a bare semver', () => {
    expect(prependChangelogSection('# CHANGELOG\n\n## 4.110.0 (obsidian-public-1.12.4)\n\n- docs: add more tsdocs\n', '## 1.4.0\n\n- fix: a correction'))
      .toBe('# CHANGELOG\n\n## 1.4.0\n\n- fix: a correction\n\n## 4.110.0 (obsidian-public-1.12.4)\n\n- docs: add more tsdocs\n');
  });

  it('does not reformat the older sections it carries forward', () => {
    const existing = '# CHANGELOG\n\n## 4.110.0 (obsidian-public-1.12.4)\n\n-   docs: add more tsdocs\n';
    expect(prependChangelogSection(existing, '## 1.11.0\n\n- fix: a correction'))
      .toContain('-   docs: add more tsdocs');
  });
});
