/**
 * @file
 *
 * Filing what an unattended workflow could not finish as an issue in this repository, and closing it again
 * once the work it asked for is done.
 *
 * A workflow's log is read by nobody unless the run is red, and a run that did everything it could is green.
 * `check-obsidian-package-update` once stayed green for weeks while the repository fell two Obsidian versions
 * behind, so what it cannot do by machine -- claim a new npm package name, cut a branch the ordering forbids --
 * is filed where the maintainers already look.
 *
 * The first-release issue is the one a machine can also see the end of: it asks for a package to reach npm,
 * and the release workflow is what puts it there. So the workflows close it themselves, rather than leaving a
 * maintainer to close an issue whose answer is already on npm.
 */

import process from 'node:process';

import type { BranchSpec } from './branch-spec.ts';

import {
  generateBranchName,
  parseBranchSpec
} from './branch-spec.ts';
import {
  buildScopedTagName,
  getScopedPackageName
} from './npm.ts';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_URL = 'https://github.com';

/**
 * Every first-release issue title starts with this, followed by the release branch name.
 */
const FIRST_RELEASE_ISSUE_TITLE_PREFIX = 'Publish the first release of ';

/**
 * An open first-release issue, and the release branch its title names.
 */
export interface FirstReleaseIssue {
  /**
   * The release branch the issue is for.
   */
  readonly branchSpec: BranchSpec;

  /**
   * The issue.
   */
  readonly issue: Issue;
}

/**
 * What the issue calls need: where to send them, and with what.
 */
export interface GitHubIssuesContext {
  /**
   * The `fetch` to call, so a test can answer in place of GitHub.
   */
  readonly fetch: typeof fetch;

  /**
   * The repository, as `owner/name`.
   */
  readonly repo: string;

  /**
   * The token, which needs `issues: write` for anything but a search.
   */
  readonly token: string;
}

/**
 * The part of a GitHub issue this file reads.
 */
export interface Issue {
  readonly html_url: string;
  readonly number: number;
  readonly title: string;
}

/**
 * The part of a GitHub issue search result this file reads.
 */
interface IssueSearchResult {
  readonly items: readonly Issue[];
}

/**
 * Closes the open first-release issue of a release branch, as completed, with a comment naming the release.
 *
 * Called only once the package is on npm, so an issue whose release failed stays open. A branch with no such
 * issue -- every branch released before the issue existed, or one whose issue a maintainer already closed --
 * is answered `undefined` and changes nothing.
 *
 * @param context - Where to send the calls.
 * @param branchSpec - The release branch whose issue to close.
 * @param version - The version of the branch's package that is on npm.
 * @returns The issue it closed, or `undefined` when there was none.
 */
export async function closeFirstReleaseIssue(context: GitHubIssuesContext, branchSpec: BranchSpec, version: string): Promise<Issue | undefined> {
  const title = getFirstReleaseIssueTitle(generateBranchName(branchSpec));
  const issue = findIssueByTitle(await searchIssues(context, `is:open in:title "${title.replaceAll('"', '')}"`), title);

  if (!issue) {
    console.log(`No open issue titled "${title}", so there is nothing to close.`);
    return undefined;
  }

  await closeIssue(context, issue, composeFirstReleaseComment(context.repo, branchSpec, version));
  return issue;
}

/**
 * Comments on an issue, then closes it as completed.
 *
 * The comment goes first, so an issue is never closed without saying why. A failed close leaves the comment
 * behind on an open issue, which the next run comments on again; that is the cheaper of the two failures.
 *
 * @param context - Where to send the calls.
 * @param issue - The issue.
 * @param comment - The comment, in Markdown.
 */
export async function closeIssue(context: GitHubIssuesContext, issue: Issue, comment: string): Promise<void> {
  await callGitHub(context, `/repos/${context.repo}/issues/${String(issue.number)}/comments`, 'POST', { body: comment }, 'Commenting on the issue');
  // eslint-disable-next-line camelcase -- GitHub's own field name.
  await callGitHub(context, `/repos/${context.repo}/issues/${String(issue.number)}`, 'PATCH', { state: 'closed', state_reason: 'completed' }, 'Closing the issue');
  console.log(`Closed: ${issue.html_url}`);
}

/**
 * Writes the comment a first-release issue is closed with: the npm version and the GitHub release it came from.
 *
 * @param repo - The repository, as `owner/name`, whose releases page the link points at.
 * @param branchSpec - The release branch that was released.
 * @param version - The version of the branch's package that is on npm.
 * @returns The comment, in Markdown.
 */
export function composeFirstReleaseComment(repo: string, branchSpec: BranchSpec, version: string): string {
  const packageName = getScopedPackageName(branchSpec);
  const tagName = buildScopedTagName(branchSpec, version);

  return [
    `\`${generateBranchName(branchSpec)}\` is released:`,
    '',
    `- npm: [\`${packageName}@${version}\`](https://www.npmjs.com/package/${packageName}/v/${version})`,
    `- GitHub: [${tagName}](${GITHUB_URL}/${repo}/releases/tag/${tagName})`,
    '',
    'Closed by the release workflow. The typings on this branch are those of the branch it was cut from until a'
    + ' crawler pass against this Obsidian build updates them, which is tracked separately.'
  ].join('\n');
}

/**
 * Files an issue, unless one with the same title was ever filed.
 *
 * Closed issues count, so closing one is how a maintainer says "seen, leave it": a three-hourly workflow must
 * not file it again on the next run. That makes the title the identity of the report, and each caller builds
 * it from what the report is about.
 *
 * Without a token -- a run outside GitHub Actions -- it only prints, so nothing is lost and nothing is filed.
 *
 * @param title - The issue title, which identifies the report.
 * @param body - The issue body, in Markdown.
 */
export async function fileIssueOnce(title: string, body: string): Promise<void> {
  const context = getGitHubIssuesContext();

  if (!context) {
    console.warn(`No GITHUB_TOKEN or GITHUB_REPOSITORY, so this is printed rather than filed:\n# ${title}\n\n${body}`);
    return;
  }

  // The search index can lag a freshly filed issue by a minute or so; the workflow runs every three hours.
  const existingIssue = findIssueByTitle(await searchIssues(context, `in:title "${title.replaceAll('"', '')}"`), title);
  if (existingIssue) {
    console.log(`Already filed: ${existingIssue.html_url}`);
    return;
  }

  const filedIssue = await callGitHub<Issue>(context, `/repos/${context.repo}/issues`, 'POST', { body, title }, 'Filing the issue');
  console.log(`Filed: ${filedIssue.html_url}`);
}

/**
 * Finds the issue whose title is exactly `title`.
 *
 * The search matches words, not the whole title, so `release/obsidian-public/1.14.5` also finds the issue of
 * `release/obsidian-public/1.14.50`, and every search result has to be checked again for the exact title.
 *
 * @param issues - The search results.
 * @param title - The exact title.
 * @returns The issue, or `undefined` when none has that title.
 */
export function findIssueByTitle(issues: readonly Issue[], title: string): Issue | undefined {
  return issues.find((issue) => issue.title === title);
}

/**
 * Builds the title of the issue filed for a release branch whose package is not released yet.
 *
 * Both the filer and the closers build it here, because the title is the issue's identity: a filer and a
 * closer that disagreed by one character would leave every issue open.
 *
 * @param branchName - The release branch name.
 * @returns The title.
 */
export function getFirstReleaseIssueTitle(branchName: string): string {
  return `${FIRST_RELEASE_ISSUE_TITLE_PREFIX}${branchName}`;
}

/**
 * Reads the issue calls' context from the GitHub Actions environment.
 *
 * @returns The context, or `null` outside GitHub Actions, where there is no token.
 */
export function getGitHubIssuesContext(): GitHubIssuesContext | null {
  const token = process.env['GITHUB_TOKEN'];
  const repo = process.env['GITHUB_REPOSITORY'];

  return !token || !repo ? null : { fetch, repo, token };
}

/**
 * Lists the open first-release issues, with the release branch each one is for.
 *
 * @param context - Where to send the calls.
 * @returns Each open first-release issue, and the branch its title names.
 */
export async function listOpenFirstReleaseIssues(context: GitHubIssuesContext): Promise<FirstReleaseIssue[]> {
  const issues = await searchIssues(context, `is:open in:title "${FIRST_RELEASE_ISSUE_TITLE_PREFIX.trim()}"`);

  return issues.flatMap((issue) => {
    const branchSpec = parseFirstReleaseIssueTitle(issue.title);
    return branchSpec ? [{ branchSpec, issue }] : [];
  });
}

/**
 * Reads the release branch out of a first-release issue title.
 *
 * @param title - An issue title.
 * @returns The branch, or `null` when the title is not a first-release issue's.
 */
export function parseFirstReleaseIssueTitle(title: string): BranchSpec | null {
  if (!title.startsWith(FIRST_RELEASE_ISSUE_TITLE_PREFIX)) {
    return null;
  }

  try {
    return parseBranchSpec(title.slice(FIRST_RELEASE_ISSUE_TITLE_PREFIX.length));
  } catch {
    return null;
  }
}

async function callGitHub<T = unknown>(
  context: GitHubIssuesContext,
  path: string,
  method: 'GET' | 'PATCH' | 'POST',
  body: object | undefined,
  description: string
): Promise<T> {
  const response = await context.fetch(`${GITHUB_API_URL}${path}`, {
    ...(body !== undefined && { body: JSON.stringify(body) }),
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${context.token}`,
      'X-GitHub-Api-Version': '2022-11-28'
    },
    method
  });

  if (!response.ok) {
    throw new Error(`${description} failed: ${String(response.status)} ${await response.text()}`);
  }

  return await response.json() as T;
}

async function searchIssues(context: GitHubIssuesContext, query: string): Promise<readonly Issue[]> {
  const fullQuery = `repo:${context.repo} is:issue ${query}`;
  const result = await callGitHub<IssueSearchResult>(context, `/search/issues?q=${encodeURIComponent(fullQuery)}`, 'GET', undefined, 'Searching issues');
  return result.items;
}
