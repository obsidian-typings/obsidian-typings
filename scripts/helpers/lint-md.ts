/**
 * @file
 *
 * Lint markdown documentation using `markdownlint-cli2` and `linkinator`.
 */

import { exec } from '@mnaoumov/typescript-dev-toolkit/exec';
import { getNonIgnoredFiles } from '@mnaoumov/typescript-dev-toolkit/git';
import { resolveToolCommand } from '@mnaoumov/typescript-dev-toolkit/package-manager';
import {
  execFromRoot,
  getRootFolder
} from '@mnaoumov/typescript-dev-toolkit/root';
import { glob } from 'node:fs/promises';

import {
  MD_FALLBACK_EXCLUDES,
  UNCHECKED_FOLDERS
} from './md-ignores.ts';

interface LintMdParams {
  readonly paths?: string[] | undefined;
  readonly shouldFix?: boolean | undefined;
}

interface VerifyLinksParams {
  readonly files: readonly string[];
  readonly serverRoot: string;
}

/*
The git pathspec matching every markdown file in the repository, at any depth.
*/
const MARKDOWN_PATHSPEC = '*.md';

export async function lintMd(params: LintMdParams): Promise<void> {
  const { paths = [], shouldFix = false } = params;

  await execFromRoot([
    ...resolveToolCommand({ tool: 'markdownlint-cli2' }),
    ...(shouldFix ? ['--fix'] : []),
    /*
     * Explicit paths are merged with the config `globs`, so without this an explicit path would still
     * re-expand the whole-tree markdown glob.
     */
    ...(paths.length > 0 ? ['--no-globs'] : []),
    { batchedArguments: paths }
  ]);

  if (shouldFix) {
    return;
  }

  const rootFolder = getRootFolder();
  if (rootFolder === null) {
    throw new Error('Cannot find the repository root folder.');
  }

  const mdFiles = paths.length > 0
    ? paths
    : await getMarkdownFiles();
  await verifyLinks({ files: mdFiles, serverRoot: rootFolder });
}

/**
 * Verifies the links in markdown files with `linkinator`.
 *
 * `linkinator` serves the files it checks from a local web server, and when it is handed exactly one file and no
 * `--server-root`, it serves that file's own folder. A `../` link then climbs above the server root, the URL
 * clamps it back to the root, and `reports/x.md` linking `../tests/a.ts` is reported as a 404 for
 * `reports/tests/a.ts`. More than one file makes it serve the working folder instead, so the defect only showed
 * when a single file (or a batch of one) was checked. Passing the root explicitly makes every invocation agree.
 *
 * The root must be absolute: `linkinator` strips as many leading segments from each file path as the root has,
 * so `.` (one segment) turns `reports/x.md` into `x.md`.
 *
 * @param params - The files, relative to `serverRoot`, and the absolute folder they are served from.
 */
export async function verifyLinks(params: VerifyLinksParams): Promise<void> {
  const { files, serverRoot } = params;
  await exec([
    ...resolveToolCommand({ tool: 'linkinator' }),
    '--server-root',
    serverRoot,
    /*
     * GitHub answers 404 to logged-out requests for a repo's stargazers page, so linkinator reports the
     * README's star badge link as broken even though it resolves fine in a browser. Keep the pattern free of
     * cmd.exe metacharacters (`^`, `|`, parentheses) - they do not survive the shell on Windows.
     */
    '--skip',
    String.raw`https://github\.com/.+/stargazers$`,
    '--retry',
    '--retry-errors',
    '--retry-errors-count',
    '3',
    '--retry-errors-jitter',
    '5',
    '--url-rewrite-search',
    String.raw`https://www\.npmjs\.com/package/`,
    '--url-rewrite-replace',
    'https://registry.npmjs.org/',
    { batchedArguments: files }
  ], { cwd: serverRoot });
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
  return nonIgnoredFiles ? nonIgnoredFiles.filter((path) => !checkIsUnchecked(path)) : (await toArray(glob(['**/*.md'], { exclude: MD_FALLBACK_EXCLUDES })));
}

async function toArray<T>(iter: AsyncIterableIterator<T>): Promise<T[]> {
  const array: T[] = [];
  for await (const item of iter) {
    array.push(item);
  }
  return array;
}
