/**
 * @file
 *
 * Filing what an unattended workflow could not finish as an issue in this repository.
 *
 * A workflow's log is read by nobody unless the run is red, and a run that did everything it could is green.
 * `check-obsidian-package-update` once stayed green for weeks while the repository fell two Obsidian versions
 * behind, so what it cannot do by machine -- claim a new npm package name, cut a branch the ordering forbids --
 * is filed where the maintainers already look.
 */

import process from 'node:process';

const GITHUB_API_URL = 'https://api.github.com';

/**
 * The part of a GitHub issue this file reads.
 */
interface Issue {
  readonly html_url: string;
  readonly title: string;
}

/**
 * The part of a GitHub issue search result this file reads.
 */
interface IssueSearchResult {
  readonly items: readonly Issue[];
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
  const token = process.env['GITHUB_TOKEN'];
  const repo = process.env['GITHUB_REPOSITORY'];

  if (!token || !repo) {
    console.warn(`No GITHUB_TOKEN or GITHUB_REPOSITORY, so this is printed rather than filed:\n# ${title}\n\n${body}`);
    return;
  }

  const headers = {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28'
  };

  // The search index can lag a freshly filed issue by a minute or so; the workflow runs every three hours.
  const query = `repo:${repo} is:issue in:title "${title.replaceAll('"', '')}"`;
  const searchResponse = await fetch(`${GITHUB_API_URL}/search/issues?q=${encodeURIComponent(query)}`, { headers });
  if (!searchResponse.ok) {
    throw new Error(`Searching issues failed: ${String(searchResponse.status)} ${await searchResponse.text()}`);
  }

  const searchResult = await searchResponse.json() as IssueSearchResult;
  const existingIssue = searchResult.items.find((item) => item.title === title);
  if (existingIssue) {
    console.log(`Already filed: ${existingIssue.html_url}`);
    return;
  }

  const filingResponse = await fetch(`${GITHUB_API_URL}/repos/${repo}/issues`, {
    body: JSON.stringify({ body, title }),
    headers,
    method: 'POST'
  });
  if (!filingResponse.ok) {
    throw new Error(`Filing the issue failed: ${String(filingResponse.status)} ${await filingResponse.text()}`);
  }

  const filedIssue = await filingResponse.json() as Issue;
  console.log(`Filed: ${filedIssue.html_url}`);
}
