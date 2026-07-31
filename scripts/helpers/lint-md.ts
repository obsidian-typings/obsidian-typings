/**
 * @file
 *
 * Lint markdown documentation using `markdownlint-cli2` and `linkinator`.
 */

import { glob } from 'node:fs/promises';

import { getNonIgnoredFiles } from './git.ts';
import {
  MD_FALLBACK_EXCLUDES,
  UNCHECKED_FOLDERS
} from './md-ignores.ts';
import { execFromRoot } from './root.ts';

interface LintMdParams {
  readonly paths?: string[] | undefined;
  readonly shouldFix?: boolean | undefined;
}

/* The git pathspec matching every markdown file in the repository, at any depth. */
const MARKDOWN_PATHSPEC = '*.md';

export async function lintMd(params: LintMdParams): Promise<void> {
  const { paths = [], shouldFix = false } = params;

  await execFromRoot([
    'npx',
    'markdownlint-cli2',
    ...(shouldFix ? ['--fix'] : []),
    /*
     * Explicit paths are merged with the config `globs`, so without this an explicit path would still
     * re-expand the whole-tree markdown glob.
     */
    ...(paths.length ? ['--no-globs'] : []),
    { batchedArgs: paths }
  ]);

  if (shouldFix) {
    return;
  }

  const mdFiles = paths.length
    ? paths
    : await getMarkdownFiles();
  await execFromRoot([
    'npx',
    'linkinator',
    /*
     * GitHub answers 404 to logged-out requests for a repo's stargazers page, so linkinator reports the
     * README's star badge link as broken even though it resolves fine in a browser. Keep the pattern free of
     * cmd.exe metacharacters (`^`, `|`, parentheses) - they do not survive the shell on Windows.
     */
    '--skip',
    'https://github\\.com/.+/stargazers$',
    '--retry',
    '--retry-errors',
    '--retry-errors-count',
    '3',
    '--retry-errors-jitter',
    '5',
    '--url-rewrite-search',
    'https://www\\.npmjs\\.com/package/',
    '--url-rewrite-replace',
    'https://registry.npmjs.org/',
    { batchedArgs: mdFiles }
  ]);
}

function checkIsUnchecked(path: string): boolean {
  return UNCHECKED_FOLDERS.some((folder) => path.startsWith(`${folder}/`));
}

/*
 * Lists the markdown files to hand to `linkinator`.
 *
 * `linkinator` takes a file list rather than an ignore configuration, so the gitignored files have to be
 * dropped before it is invoked. Git itself answers that (nested ignore files, `!` negations and all); the
 * hand-maintained glob exclusions are only the fallback for a checkout without git, and they are the very
 * lists this indirection exists to stop from drifting.
 */
async function getMarkdownFiles(): Promise<string[]> {
  const nonIgnoredFiles = await getNonIgnoredFiles({ patterns: [MARKDOWN_PATHSPEC] });
  if (nonIgnoredFiles) {
    return nonIgnoredFiles.filter((path) => !checkIsUnchecked(path));
  }

  return await toArray(glob(['**/*.md'], { exclude: MD_FALLBACK_EXCLUDES }));
}

async function toArray<T>(iter: AsyncIterableIterator<T>): Promise<T[]> {
  const arr: T[] = [];
  for await (const item of iter) {
    arr.push(item);
  }
  return arr;
}
