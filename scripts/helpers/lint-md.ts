import { glob } from 'node:fs/promises';

import { execFromRoot } from './exec.ts';

interface LintMdParams {
  paths?: string[] | undefined;
  shouldFix?: boolean | undefined;
}

export async function lintMd(params: LintMdParams): Promise<void> {
  const { paths = [], shouldFix = false } = params;

  await execFromRoot(['npx', 'markdownlint-cli2', ...(shouldFix ? ['--fix'] : []), ...paths]);

  const mdFiles = paths?.length
    ? paths
    : await toArray(glob(['**/*.md'], {
      exclude: [
        '.git/**',
        'dist/**',
        'docs/**',
        'node_modules/**',
        'workflow-scripts/**'
      ]
    }));
  await execFromRoot([
    'npx',
    'linkinator',
    ...mdFiles,
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
