/**
 * @file
 *
 * Tests for matching a release branch's first-release issue and for closing it.
 *
 * The title is the issue's identity, so the matcher has to tell `1.14.5` from `1.14.50` and a first-release
 * issue from every other issue the search returns. The close path has to comment before it closes, close as
 * completed, and leave everything alone when there is no open issue.
 */

// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import type {
  GitHubIssuesContext,
  Issue
} from './github-issues.ts';

import {
  closeFirstReleaseIssue,
  composeFirstReleaseComment,
  findIssueByTitle,
  getFirstReleaseIssueTitle,
  listOpenFirstReleaseIssues,
  parseFirstReleaseIssueTitle
} from './github-issues.ts';

interface FakeGitHub {
  readonly context: GitHubIssuesContext;
  readonly requests: readonly RecordedRequest[];
}

interface RecordedRequest {
  readonly body: unknown;
  readonly method: string;
  readonly url: string;
}

const REPO = 'obsidian-typings/obsidian-typings';
const BRANCH_SPEC = { channel: 'public', obsidianVersion: '1.14.5' } as const;

function createFakeGitHub(searchResults: readonly Issue[], writeStatus = 200): FakeGitHub {
  const requests: RecordedRequest[] = [];

  function fakeFetch(input: Parameters<typeof fetch>[0], init?: RequestInit): Promise<Response> {
    const url = input instanceof Request ? input.url : String(input);
    const method = init?.method ?? 'GET';
    requests.push({ body: typeof init?.body === 'string' ? JSON.parse(init.body) : undefined, method, url });

    const isSearch = url.includes('/search/issues');
    const responseBody = isSearch ? { items: searchResults } : {};
    return Promise.resolve(Response.json(responseBody, { status: isSearch ? 200 : writeStatus }));
  }

  return { context: { fetch: fakeFetch, repo: REPO, token: 'token' }, requests };
}

function createIssue(issueNumber: number, title: string): Issue {
  // eslint-disable-next-line camelcase -- GitHub's own field name.
  return { html_url: `https://github.com/${REPO}/issues/${String(issueNumber)}`, number: issueNumber, title };
}

describe('getFirstReleaseIssueTitle', () => {
  it('names the branch after the prefix the filed issues carry', () => {
    expect(getFirstReleaseIssueTitle('release/obsidian-public/1.14.5')).toBe('Publish the first release of release/obsidian-public/1.14.5');
  });
});

describe('parseFirstReleaseIssueTitle', () => {
  it('reads the branch back out of the title', () => {
    expect(parseFirstReleaseIssueTitle('Publish the first release of release/obsidian-catalyst/1.15.0')).toEqual({
      channel: 'catalyst',
      obsidianVersion: '1.15.0'
    });
  });

  it('answers null for an issue of another kind', () => {
    expect(parseFirstReleaseIssueTitle('Obsidian 1.14.5 public has no release branch')).toBeNull();
  });

  it('answers null for a title whose branch is malformed', () => {
    expect(parseFirstReleaseIssueTitle('Publish the first release of release/obsidian-public/next')).toBeNull();
  });
});

describe('findIssueByTitle', () => {
  it('does not let a version match a longer one', () => {
    const issues = [createIssue(1, 'Publish the first release of release/obsidian-public/1.14.50')];
    expect(findIssueByTitle(issues, 'Publish the first release of release/obsidian-public/1.14.5')).toBeUndefined();
  });

  it('finds the exact title among other results', () => {
    const exact = createIssue(146, 'Publish the first release of release/obsidian-public/1.14.5');
    const issues = [createIssue(1, 'Publish the first release of release/obsidian-public/1.14.50'), exact];
    expect(findIssueByTitle(issues, exact.title)).toBe(exact);
  });
});

describe('composeFirstReleaseComment', () => {
  it('links the npm version and the GitHub release', () => {
    const comment = composeFirstReleaseComment(REPO, BRANCH_SPEC, '1.1.0');

    expect(comment).toContain('https://www.npmjs.com/package/@obsidian-typings/obsidian-public-1.14.5/v/1.1.0');
    expect(comment).toContain(`https://github.com/${REPO}/releases/tag/obsidian-public-1.14.5-v1.1.0`);
  });
});

describe('listOpenFirstReleaseIssues', () => {
  it('keeps only first-release issues, each with its branch', async () => {
    const firstRelease = createIssue(147, 'Publish the first release of release/obsidian-catalyst/1.15.0');
    const { context, requests } = createFakeGitHub([createIssue(1, 'Obsidian 1.14.3 public has no release branch'), firstRelease]);

    expect(await listOpenFirstReleaseIssues(context)).toEqual([{ branchSpec: { channel: 'catalyst', obsidianVersion: '1.15.0' }, issue: firstRelease }]);
    expect(decodeURIComponent(requests[0]?.url ?? '')).toContain(`repo:${REPO} is:issue is:open`);
  });
});

describe('closeFirstReleaseIssue', () => {
  it('comments, then closes the issue as completed', async () => {
    const { context, requests } = createFakeGitHub([createIssue(146, 'Publish the first release of release/obsidian-public/1.14.5')]);

    const closedIssue = await closeFirstReleaseIssue(context, BRANCH_SPEC, '1.1.0');
    expect(closedIssue?.number).toBe(146);
    expect(requests.map((request) => `${request.method} ${request.url.split('?', 1)[0] ?? ''}`)).toEqual([
      'GET https://api.github.com/search/issues',
      `POST https://api.github.com/repos/${REPO}/issues/146/comments`,
      `PATCH https://api.github.com/repos/${REPO}/issues/146`
    ]);
    // eslint-disable-next-line camelcase -- GitHub's own field name.
    expect(requests[2]?.body).toEqual({ state: 'closed', state_reason: 'completed' });
  });

  it('searches open issues only, so a closed one is never touched', async () => {
    const { context, requests } = createFakeGitHub([]);

    expect(await closeFirstReleaseIssue(context, BRANCH_SPEC, '1.1.0')).toBeUndefined();
    expect(requests).toHaveLength(1);
    expect(decodeURIComponent(requests[0]?.url ?? '')).toContain('is:open');
  });

  it('leaves the issue of another branch alone', async () => {
    const { context, requests } = createFakeGitHub([createIssue(1, 'Publish the first release of release/obsidian-public/1.14.50')]);

    expect(await closeFirstReleaseIssue(context, BRANCH_SPEC, '1.1.0')).toBeUndefined();
    expect(requests).toHaveLength(1);
  });

  it('fails without closing when the comment is refused', async () => {
    const { context, requests } = createFakeGitHub([createIssue(146, 'Publish the first release of release/obsidian-public/1.14.5')], 403);

    await expect(closeFirstReleaseIssue(context, BRANCH_SPEC, '1.1.0')).rejects.toThrow(/Commenting on the issue failed: 403/);
    expect(requests.some((request) => request.method === 'PATCH')).toBe(false);
  });
});
