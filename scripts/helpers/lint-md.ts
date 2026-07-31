import { glob } from 'node:fs/promises';

import { mdIgnores } from './md-ignores.ts';
import { execFromRoot } from './root.ts';

interface LintMdParams {
  readonly paths?: string[] | undefined;
  readonly shouldFix?: boolean | undefined;
}

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
    ...paths
  ]);

  if (shouldFix) {
    return;
  }

  const mdFiles = paths.length
    ? paths
    : await toArray(glob(['**/*.md'], { exclude: mdIgnores }));
  await execFromRoot([
    'npx',
    'linkinator',
    ...mdFiles,
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
    'https://registry.npmjs.org/'
  ]);
}

async function toArray<T>(iter: AsyncIterableIterator<T>): Promise<T[]> {
  const arr: T[] = [];
  for await (const item of iter) {
    arr.push(item);
  }
  return arr;
}
