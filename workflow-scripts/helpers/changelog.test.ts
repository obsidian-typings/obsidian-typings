/**
 * @file
 *
 * Tests for the changelog section a release publishes.
 *
 * Only the pure half is tested here -- composing a section, prepending it, and turning a commit message into
 * a line -- following `baseBranch.test.ts` beside it. The git reads are three flags and a NUL split; what is
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

import {
  composeChangelogSection,
  createInitialChangelog,
  prependChangelogSection,
  toBreakingChangeSubjects,
  toChangelogEntries
} from './changelog.ts';

describe('composeChangelogSection', () => {
  it('writes a flat list when nothing in the release is breaking', () => {
    expect(composeChangelogSection({
      breakingChangeSubjects: [],
      entries: [
        'fix(plugins): enable/disablePlugin take the user flag',
        'fix(app): getSpellcheckLanguages returns null'
      ],
      version: '1.11.0'
    })).toBe([
      '## 1.11.0',
      '',
      '- fix(plugins): enable/disablePlugin take the user flag',
      '- fix(app): getSpellcheckLanguages returns null'
    ].join('\n'));
  });

  it('partitions the release rather than repeating a breaking entry in both lists', () => {
    expect(composeChangelogSection({
      breakingChangeSubjects: ['fix(app)!: drop getSpellcheckLanguages'],
      entries: [
        'fix(app)!: drop getSpellcheckLanguages',
        'fix(plugins): enable/disablePlugin take the user flag'
      ],
      version: '1.11.0'
    })).toBe([
      '## 1.11.0',
      '',
      '### Breaking changes',
      '',
      '- fix(app)!: drop getSpellcheckLanguages',
      '',
      '### Other changes',
      '',
      '- fix(plugins): enable/disablePlugin take the user flag'
    ].join('\n'));
  });

  it('omits the Other changes heading when every entry is breaking', () => {
    expect(composeChangelogSection({
      breakingChangeSubjects: ['fix(app)!: drop getSpellcheckLanguages'],
      entries: ['fix(app)!: drop getSpellcheckLanguages'],
      version: '1.11.0'
    })).toBe([
      '## 1.11.0',
      '',
      '### Breaking changes',
      '',
      '- fix(app)!: drop getSpellcheckLanguages'
    ].join('\n'));
  });

  it('still publishes a breaking subject that matches no entry', () => {
    // The `--first-parent` hole: a `BREAKING CHANGE:` footer written on a branch commit whose merge subject
    // says something else. Dropping it would lose the change from the one document that exists to announce it.
    expect(composeChangelogSection({
      breakingChangeSubjects: ['fix(app): widen the declared return'],
      entries: ['chore: land the September corrections'],
      version: '1.11.0'
    })).toBe([
      '## 1.11.0',
      '',
      '### Breaking changes',
      '',
      '- fix(app): widen the declared return',
      '',
      '### Other changes',
      '',
      '- chore: land the September corrections'
    ].join('\n'));
  });

  it('says so when the range is empty, rather than writing a headed blank', () => {
    expect(composeChangelogSection({
      breakingChangeSubjects: [],
      entries: [],
      version: '1.11.0'
    })).toBe([
      '## 1.11.0',
      '',
      '- No changes recorded since the previous release.'
    ].join('\n'));
  });
});

describe('toChangelogEntries', () => {
  it('takes the subject of an ordinary commit', () => {
    expect(toChangelogEntries(['fix(app): widen a declared return\n\nA body nobody publishes.\n']))
      .toEqual(['fix(app): widen a declared return']);
  });

  it('lifts the body onto a default merge subject, rather than publishing a branch name', () => {
    // 29 of the catalyst branch's 62 merges are pre-workflow pull-request merges, and on a first-parent walk
    // the merge IS the entry.
    expect(toChangelogEntries(['Merge pull request #17 from obsidian-typings/some-branch\n\nfeat(setting): declare setIcon and iconEl\n']))
      .toEqual(['feat(setting): declare setIcon and iconEl']);
  });

  it('keeps a merge subject an author wrote, which is this repository\'s usual shape', () => {
    expect(toChangelogEntries(['fix(app): widen a declared return\n\nfix(app): widen a declared return\n']))
      .toEqual(['fix(app): widen a declared return']);
  });

  it('keeps a default merge subject that has no body to lift', () => {
    expect(toChangelogEntries(['Merge branch \'main\' into release\n'])).toEqual(['Merge branch \'main\' into release']);
  });

  it('drops this repository\'s own release bookkeeping', () => {
    expect(toChangelogEntries([
      'chore(release): 1.10.0\n',
      'chore(release): reset to 1.0.0\n',
      'fix(app): widen a declared return\n'
    ])).toEqual(['fix(app): widen a declared return']);
  });
});

describe('toBreakingChangeSubjects', () => {
  it('finds a BREAKING CHANGE: footer in a body', () => {
    expect(toBreakingChangeSubjects(['fix(app): widen a declared return\n\nBREAKING CHANGE: TS2322 on an assignment that compiled before.\n']))
      .toEqual(['fix(app): widen a declared return']);
  });

  it('accepts the hyphenated spelling Conventional Commits also allows', () => {
    expect(toBreakingChangeSubjects(['fix(app): widen a declared return\n\nBREAKING-CHANGE: TS2322.\n']))
      .toEqual(['fix(app): widen a declared return']);
  });

  it('finds the ! marker on a subject', () => {
    expect(toBreakingChangeSubjects(['feat(app)!: drop a member\n'])).toEqual(['feat(app)!: drop a member']);
  });

  it('de-duplicates the pair every landing here produces', () => {
    // The merge copies the branch commit's message whole, so a non-first-parent read sees both.
    const message = 'fix(app): widen a declared return\n\nBREAKING CHANGE: TS2322.\n';
    expect(toBreakingChangeSubjects([message, message])).toEqual(['fix(app): widen a declared return']);
  });

  it('says nothing about a commit carrying neither signal', () => {
    expect(toBreakingChangeSubjects(['fix(app): widen a declared return\n\nA body mentioning no footer.\n'])).toEqual([]);
  });

  it('does not read a mid-body mention as a footer', () => {
    expect(toBreakingChangeSubjects(['docs: explain what a BREAKING CHANGE: footer is\n\nIt goes at the bottom.\n']))
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
