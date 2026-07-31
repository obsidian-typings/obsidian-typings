/**
 * @file
 *
 * Git-derived file listings for the repo-walking scripts.
 *
 * Tooling that walks the repository must skip whatever `.gitignore` skips - otherwise every script grows its
 * own hand-maintained ignore list, the lists drift apart, and a path that is gitignored but not enumerated
 * (a nested `node_modules` under a test fixture, say) is walked anyway. Most tools have a native switch for
 * this; the ones that do not take a file list instead, and that is what this module produces.
 *
 * Asking git rather than parsing `.gitignore` is deliberate: it honors nested ignore files, `!` negations,
 * `.git/info/exclude`, and the user's global excludes, at no cost to us.
 */

import { execFromRoot } from './root.ts';

export interface GetNonIgnoredFilesOptions {
  readonly patterns?: readonly string[] | undefined;
}

/*
 * Separates the paths in `git ls-files -z` output. Using the NUL form avoids git's quoting of paths that
 * contain unusual characters, which would otherwise have to be unescaped.
 */
const NUL_SEPARATOR = '\0';

/**
 * Lists the repository files that `.gitignore` does not exclude.
 *
 * Covers both tracked files and untracked-but-not-ignored ones, so a brand-new file is checked before it is
 * ever committed. Resolves with `null` when git cannot answer - it is not installed, or the project is not a
 * git repository (a tarball checkout, for instance) - and callers fall back to their own listing.
 */
export async function getNonIgnoredFiles(options?: GetNonIgnoredFilesOptions): Promise<null | string[]> {
  const { patterns = [] } = options ?? {};
  const command = [
    'git',
    'ls-files',
    '--cached',
    '--others',
    '--exclude-standard',
    '-z',
    ...patterns.length > 0 ? ['--', ...patterns] : []
  ];

  let stdout: string;
  try {
    stdout = await execFromRoot(command, { isQuiet: true });
  } catch {
    return null;
  }

  /*
   * `--cached --others` can name the same path twice (e.g. a file staged for deletion that is still on
   * disk).
   */
  return [...new Set(stdout.split(NUL_SEPARATOR).filter((path) => path !== ''))];
}
