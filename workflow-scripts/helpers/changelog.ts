/**
 * @file
 *
 * Builds the changelog section a release publishes, from the commits that release contains.
 *
 * Until 2026-09-23 nothing here wrote a changelog at all. Every release branch carried a three-line
 * `CHANGELOG.md` pointing at `main`'s, `package.json`'s `files` array shipped that stub inside every
 * published tarball, and `main`'s file had not been touched since 2026-03-11 -- its newest entry, `4.110.0`,
 * numbered under the pre-`@obsidian-typings` scheme that the move to `@obsidian-typings/obsidian-<channel>-
 * <version>` retired. So the one document a consumer reads to decide whether an upgrade is safe pointed six
 * months into the past, under a policy that ships **breaking corrections to declared signatures as
 * unsignalled minors** on purpose. That policy is affordable only while the break is discoverable.
 *
 * ## The traversal is `--first-parent`, and it is not a preference
 *
 * Every branch here lands a task as a real commit plus an empty `--no-ff` merge carrying a subject of its
 * own, so a generator walking the plain log emits most landings **twice**. Measured on the live branches the
 * day this was written: `obsidian-catalyst-1.14.2-v1.3.0..release/obsidian-catalyst/1.14.2` is 5 commits
 * under `--first-parent` and 10 without it, each subject appearing exactly twice. `AGENTS.md`'s
 * *"Reading a branch's history"* section carries the whole measurement and the decision behind it -- the
 * merges stay, because on a multi-commit landing the merge subject is the only statement of what the task
 * did, and `--no-merges` is the wrong traversal for that same reason read backwards.
 *
 * ## The reads are SPLIT, and that is the one subtlety
 *
 * `obsidian-dev-utils` generates its changelog this way and found the hole: a `BREAKING CHANGE:` footer
 * written on a branch commit never reaches a first-parent walk at all, because only the merge is on that
 * chain. So {@link getChangelogEntries} reads the first-parent commits and
 * {@link getBreakingChangeSubjects} reads **every** commit in the range. Today the two agree -- of the 7
 * landings across all three branches whose branch commits carry such a footer, all 7 merges carry it too,
 * because the merge message was copied whole -- but that holds by habit rather than by construction, and a
 * habit is not a thing to publish a safety claim on.
 *
 * The consumer of the second read differs from that library's. There it feeds a version floor; here it does
 * not, because this repository always bumps a minor by deliberate policy. Here it decides which entries are
 * called out as breaking, which is the half a consumer of an unsignalled minor actually needs.
 */

import {
  readFile,
  writeFile
} from 'node:fs/promises';
import { join } from 'node:path/posix';

import {
  execFromRoot,
  getRootFolder
} from './root.ts';

/**
 * A `BREAKING CHANGE:` footer, in both spellings Conventional Commits allows.
 *
 * Matched per line (`m`) rather than against the whole message, because a footer sits at the bottom of a
 * body.
 */
const BREAKING_CHANGE_FOOTER_REG_EXP = /^BREAKING[ -]CHANGE:/m;

/**
 * A Conventional-Commits subject: a type, an optional scope, an optional `!`, then the colon.
 *
 * Deliberately tolerant of a subject that is not one at all. An unparsable subject simply contributes no
 * breaking signal, which is the same answer a `chore:` gives -- and the cost of missing one is that an entry
 * is listed as ordinary rather than as breaking, never that it is dropped.
 */
const CONVENTIONAL_COMMIT_SUBJECT_REG_EXP = /^[a-z]+(?:\([^()]*\))?(?<Breaking>!):\s/i;

/**
 * The name of the changelog file, as `package.json`'s `files` array on every release branch spells it.
 */
export const CHANGELOG_FILE_NAME = 'CHANGELOG.md';

/**
 * The file the release notes are written to for `softprops/action-gh-release` to read through `body_path`.
 *
 * Deliberately untracked, and safe to be: every `git add` in `workflow-scripts/` names its files
 * (`package.json package-lock.json`, `README.md`, and now `CHANGELOG.md`), so there is no `git add -A`
 * anywhere that could sweep it into a release commit. It sits beside `build/`, which the same run creates
 * untracked for the zip the same release attaches.
 */
export const RELEASE_NOTES_FILE_NAME = 'release-notes.md';

/**
 * The first line of every `CHANGELOG.md` this repository writes, on `main` and on every release branch.
 */
const CHANGELOG_HEADING = '# CHANGELOG';

/**
 * The release bookkeeping this repository's own scripts commit, which is not a change and does not belong in
 * a changelog.
 *
 * Two commits carry this subject and both are written from `workflow-scripts/`, never by hand:
 * `chore(release): <version>` from `publish-release.ts`'s version bump, and
 * `chore(release): reset to 1.0.0` from `create-new-release-branch.ts`'s branch-cut reset.
 *
 * In the ordinary case neither is reachable -- the range opens at the previous release's tag, which points at
 * that bump -- so this looks redundant until the two ranges where it is not. A branch's FIRST release spans
 * the cut, so its range always contains the reset commit; and a range that spans more than one release, which
 * a re-dispatch or a `describe` fallback can produce, contains every bump between them. Measured on
 * `obsidian-public-1.13.7-v1.8.0..release/obsidian-public/1.13.7`, which listed `chore(release): 1.10.0` and
 * `chore(release): 1.9.0` among its changes.
 */
const RELEASE_COMMIT_SUBJECT_PREFIX = 'chore(release):';

/**
 * A version section's heading, which is what makes an existing changelog history rather than a placeholder.
 *
 * Anchored per line (`m`), and deliberately `## ` rather than `## <semver>`: the sections this repository
 * published before the move to scoped packages are headed `## 4.110.0 (obsidian-public-1.12.4)`, and a
 * pattern that failed to recognize those would discard the whole archive.
 */
const SECTION_HEADING_REG_EXP = /^## /m;

/**
 * The shape of a merge subject git wrote itself, rather than one an author chose.
 *
 * Every default git produces opens with `Merge` and a word boundary. It matters here because 29 of the 62
 * merges on the catalyst branch are pre-workflow `Merge pull request #<n> from ...` commits: on a
 * first-parent walk the merge IS the entry, so without this a changelog would publish a branch name where a
 * description belongs. The message the author wrote is usually still there one line below, as the merge
 * body, so it is lifted out rather than discarded -- which is exactly the edit a human makes by hand.
 */
const MERGE_SUBJECT_REG_EXP = /^Merge(?: branch| remote-tracking| pull request)?\b/;

/**
 * What {@link composeChangelogSection} needs to write one release's section.
 */
export interface ChangelogSectionOptions {
  /**
   * The subjects of the landings this release contains that carry a breaking-change signal, as
   * {@link getBreakingChangeSubjects} collected them.
   */
  readonly breakingChangeSubjects: readonly string[];

  /**
   * One line per landing, as {@link getChangelogEntries} collected them.
   */
  readonly entries: readonly string[];

  /**
   * The version this section is headed with.
   */
  readonly version: string;
}

/**
 * What {@link readCommitMessages} needs to pick a traversal.
 */
interface ReadCommitMessagesOptions {
  /**
   * Whether to walk only the first parents -- one line per landed task -- rather than every commit.
   *
   * See this file's header: the two reads answer different questions and both are needed.
   */
  readonly isFirstParentOnly: boolean;
}

/**
 * Writes one release's section of `CHANGELOG.md`.
 *
 * A breaking landing is called out under its own subheading and is NOT repeated below it, so the two lists
 * partition the release rather than overlapping. When nothing in the release is breaking there are no
 * subheadings at all, because a lone `### Other changes` over the only list there is says nothing.
 *
 * A breaking subject that matches no entry is still listed. That is the `--first-parent` hole arriving: a
 * footer written on a branch commit whose merge subject differs. Listing it unmatched is the safe direction
 * -- the alternative is dropping a breaking change from the one document that exists to announce it.
 *
 * @param options - See {@link ChangelogSectionOptions}.
 * @returns The section, with no trailing newline.
 */
export function composeChangelogSection(options: ChangelogSectionOptions): string {
  const {
    breakingChangeSubjects,
    entries,
    version
  } = options;

  const breakingSet = new Set(breakingChangeSubjects);
  const otherEntries = entries.filter((entry) => !breakingSet.has(entry));
  const lines = [`## ${version}`, ''];

  if (entries.length === 0 && breakingChangeSubjects.length === 0) {
    lines.push('- No changes recorded since the previous release.');
    return lines.join('\n');
  }

  if (breakingChangeSubjects.length > 0) {
    lines.push('### Breaking changes', '', ...toBulletList(breakingChangeSubjects));

    if (otherEntries.length > 0) {
      lines.push('', '### Other changes', '', ...toBulletList(otherEntries));
    }

    return lines.join('\n');
  }

  lines.push(...toBulletList(otherEntries));
  return lines.join('\n');
}

/**
 * The initial `CHANGELOG.md` a freshly cut release branch starts from.
 *
 * A new branch mints a package name npm has never seen and resets its version, so it inherits none of the
 * previous package's history -- see `create-new-release-branch.ts`, where this is written as the exact
 * symmetry of `resetPackageVersion`.
 *
 * @returns The file contents, newline-terminated.
 */
export function createInitialChangelog(): string {
  return `${CHANGELOG_HEADING}\n`;
}

/**
 * The subjects in `commitRange` carrying a breaking-change signal, read over EVERY commit in the range.
 *
 * Not the first-parent ones: see this file's header for why the reads are split. Both Conventional-Commits
 * signals count -- the `!` marker on the subject, and the `BREAKING CHANGE:` footer in the body -- and the
 * result is de-duplicated, because a landing whose merge copied the branch commit's message whole produces
 * the same subject twice.
 *
 * @param commitRange - The range, as {@link resolveCommitRange} produced it.
 * @returns The subjects, in the order git reported them, without duplicates.
 */
export async function getBreakingChangeSubjects(commitRange: string): Promise<string[]> {
  return toBreakingChangeSubjects(await readCommitMessages(commitRange, { isFirstParentOnly: false }));
}

/**
 * One changelog line per landing in `commitRange`.
 *
 * @param commitRange - The range, as {@link resolveCommitRange} produced it.
 * @returns The lines, newest first, as git reports them.
 */
export async function getChangelogEntries(commitRange: string): Promise<string[]> {
  return toChangelogEntries(await readCommitMessages(commitRange, { isFirstParentOnly: true }));
}

/**
 * Puts a new section directly under the `# CHANGELOG` heading, keeping every section already there.
 *
 * Written as a prepend onto the existing text rather than as a rewrite of a parsed file: the old sections are
 * published history and nothing here has any business reformatting them.
 *
 * A file that does not open with the heading -- or an empty one -- is given one, so a branch whose changelog
 * was never initialized still produces a well-formed document rather than a headless list.
 *
 * **A tail holding no `## ` section at all is a PLACEHOLDER and is dropped**, which is the one case where
 * "keep what is there" would be wrong. Every release branch cut before 2026-09-23 carries a three-line file
 * whose whole body is `See <https://github.com/.../blob/main/CHANGELOG.md>`, pointing at a file last written
 * in March; carrying that forward would leave a stale pointer sitting underneath the real sections, which is
 * the very defect this generator exists to end. The test is structural rather than a match on that sentence,
 * so it needs no dated migration and no per-branch edit: a changelog with no sections in it has no history to
 * preserve, by definition.
 *
 * @param existingChangelog - The current file contents.
 * @param section - The section, as {@link composeChangelogSection} produced it.
 * @returns The new file contents, newline-terminated.
 */
export function prependChangelogSection(existingChangelog: string, section: string): string {
  const trimmed = existingChangelog.trimStart();
  const rest = trimmed.startsWith(CHANGELOG_HEADING) ? trimmed.slice(CHANGELOG_HEADING.length).trimStart() : trimmed;
  const hasSections = SECTION_HEADING_REG_EXP.test(rest);
  const tail = hasSections ? `\n\n${rest.trimEnd()}` : '';

  return `${CHANGELOG_HEADING}\n\n${section}${tail}\n`;
}

/**
 * The current `CHANGELOG.md`, or the initial one when the branch has none.
 *
 * A missing file is not an error: it is what a branch cut before this existed looks like, and
 * {@link prependChangelogSection} is happy to start one.
 *
 * @returns The contents.
 */
export async function readChangelog(): Promise<string> {
  try {
    return await readFile(resolveFromRoot(CHANGELOG_FILE_NAME), 'utf-8');
  } catch {
    return createInitialChangelog();
  }
}

/**
 * The commit range one release covers: everything landed since the release before it.
 *
 * The previous release's tag is derived rather than searched for, because `publish-release.ts` knows it
 * exactly -- the branch's `package.json` holds the version that was last published from it, and
 * `buildScopedTagName` names the tag that recorded it.
 *
 * The fallback is not an edge case, it is **every branch's first release**. A cut branch is reset to `1.0.0`
 * and its first publish bumps to `1.1.0`, so no `-v1.0.0` tag is ever written and the derived name misses on
 * exactly that run. `git describe --first-parent` then finds the nearest tag reachable along the first-parent
 * chain, which on a fresh branch is the base branch's last release -- precisely the point the branch was cut
 * from, and precisely the range the first release should describe.
 *
 * A repository with no reachable tag at all falls back to the whole history, which is what a first release of
 * anything means.
 *
 * @param previousTagName - The tag the previous release wrote, as `buildScopedTagName` names it.
 * @returns The range, ready to hand to `git log`.
 */
export async function resolveCommitRange(previousTagName: string): Promise<string> {
  if (await hasTag(previousTagName)) {
    return `${previousTagName}..HEAD`;
  }

  const describedTag = await describeNearestTag();
  return describedTag === null ? 'HEAD' : `${describedTag}..HEAD`;
}

/**
 * The breaking subjects among full commit messages, de-duplicated.
 *
 * The de-duplication is not cosmetic: a landing whose merge copied the branch commit's message whole appears
 * twice in a non-first-parent read, which is exactly the shape every landing on these branches has.
 *
 * @param commitMessages - The full messages of every commit in the range.
 * @returns The subjects, in the order given, without duplicates.
 */
export function toBreakingChangeSubjects(commitMessages: readonly string[]): string[] {
  const subjects = commitMessages
    .filter((commitMessage) => isBreakingChange(commitMessage))
    .map((commitMessage) => toChangelogEntry(commitMessage))
    .filter((subject) => !subject.startsWith(RELEASE_COMMIT_SUBJECT_PREFIX));

  return [...new Set(subjects)];
}

/**
 * One changelog line per full commit message, with this repository's own release bookkeeping dropped.
 *
 * @param commitMessages - The full messages of the first-parent commits in the range.
 * @returns The lines, in the order given.
 */
export function toChangelogEntries(commitMessages: readonly string[]): string[] {
  return commitMessages
    .map((commitMessage) => toChangelogEntry(commitMessage))
    .filter((entry) => !entry.startsWith(RELEASE_COMMIT_SUBJECT_PREFIX));
}

/**
 * Writes `CHANGELOG.md`.
 *
 * @param content - The contents, as {@link prependChangelogSection} produced them.
 * @returns A {@link Promise} that resolves when the file has been written.
 */
export async function writeChangelog(content: string): Promise<void> {
  await writeFile(resolveFromRoot(CHANGELOG_FILE_NAME), content, 'utf-8');
}

/**
 * Writes the release notes the GitHub release reads through `body_path`.
 *
 * @param section - The section, as {@link composeChangelogSection} produced it.
 * @returns A {@link Promise} that resolves when the file has been written.
 */
export async function writeReleaseNotes(section: string): Promise<void> {
  await writeFile(resolveFromRoot(RELEASE_NOTES_FILE_NAME), `${section}\n`, 'utf-8');
}

/**
 * The nearest tag reachable from `HEAD` along the first-parent chain, or `null` when there is none.
 */
async function describeNearestTag(): Promise<null | string> {
  const result = await execFromRoot('git describe --tags --abbrev=0 --first-parent HEAD', {
    isQuiet: true,
    shouldIgnoreExitCode: true,
    shouldIncludeDetails: true
  });

  return result.exitCode === 0 ? result.stdout.trim() || null : null;
}

/**
 * Whether `tagName` exists in this checkout.
 */
async function hasTag(tagName: string): Promise<boolean> {
  const result = await execFromRoot(['git', 'rev-parse', '-q', '--verify', `refs/tags/${tagName}`], {
    isQuiet: true,
    shouldIgnoreExitCode: true,
    shouldIncludeDetails: true
  });

  return result.exitCode === 0;
}

/**
 * Whether one full commit message carries either Conventional-Commits breaking signal.
 */
function isBreakingChange(commitMessage: string): boolean {
  const subject = commitMessage.split(/\r?\n/)[0] ?? '';
  return CONVENTIONAL_COMMIT_SUBJECT_REG_EXP.exec(subject)?.groups?.['Breaking'] !== undefined
    || BREAKING_CHANGE_FOOTER_REG_EXP.test(commitMessage);
}

/**
 * The full messages of the commits in `commitRange`.
 *
 * `-z` separates the records with NUL, so nothing a commit message contains can be mistaken for a record
 * boundary -- which a newline separator cannot promise, since `%B` is a multi-line body.
 */
async function readCommitMessages(commitRange: string, options: ReadCommitMessagesOptions): Promise<string[]> {
  const command = ['git', 'log', commitRange, '--format=%B', '-z'];

  if (options.isFirstParentOnly) {
    command.push('--first-parent');
  }

  const output = await execFromRoot(command, { isQuiet: true });
  return output.split('\0').filter((commitMessage) => commitMessage.trim() !== '');
}

/**
 * Resolves a repository-root-relative path.
 *
 * The scripts around this one reach the root through `execFromRoot`, which cds there itself; a bare
 * `readFile('CHANGELOG.md')` would instead trust `process.cwd()`, which is the caller's business and not
 * this file's.
 */
function resolveFromRoot(fileName: string): string {
  const rootFolder = getRootFolder();

  if (!rootFolder) {
    throw new Error(`Could not find root folder to resolve ${fileName} from.`);
  }

  return join(rootFolder, fileName);
}

/**
 * Renders subjects as a markdown bullet list.
 */
function toBulletList(subjects: readonly string[]): string[] {
  return subjects.map((subject) => `- ${subject}`);
}

/**
 * Turns one full commit message into the changelog line it should contribute.
 *
 * Normally that is the subject. The exception is a merge whose subject git wrote itself -- see
 * {@link MERGE_SUBJECT_REG_EXP}.
 */
function toChangelogEntry(commitMessage: string): string {
  const lines = commitMessage.split(/\r?\n/).filter((line) => line.trim() !== '');
  const subject = (lines[0] ?? '').trim();
  return MERGE_SUBJECT_REG_EXP.test(subject) ? (lines[1] ?? subject).trim() : subject;
}
