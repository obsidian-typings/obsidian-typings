/**
 * @file
 *
 * The residual ignore list for the markdown checks - the paths git does NOT ignore but we still skip.
 *
 * Everything `.gitignore` covers (`node_modules` at any depth, `dist`, generated output) is handled by the
 * tools themselves: markdownlint-cli2 through `gitignore: true`, linkinator through the git-derived file
 * list in `lint-md.ts`. What remains are directories that are tracked on some branches and deliberately
 * left unchecked, so they have to be named explicitly. Listing them is a harmless no-op on the release
 * branches, where `.gitignore` already covers them - which is what keeps this file identical everywhere.
 */

/* Tracked, but deliberately excluded from every markdown check. */
export const UNCHECKED_FOLDERS = [
  'docs',
  'workflow-scripts'
];

/* Git never "ignores" `.git` itself - it is simply outside the working tree - so that one stays explicit. */
export const MD_IGNORES = [
  '.git/**',
  ...UNCHECKED_FOLDERS.map((folder) => `${folder}/**`)
];

/*
 * The fallback exclusions for a checkout without git, where the gitignored paths have to be enumerated by
 * hand again. These are the very lists the git-derived listing exists to stop from drifting, so they are
 * reached only when `git ls-files` cannot answer.
 */
export const MD_FALLBACK_EXCLUDES = [
  '**/.git/**',
  '**/dist/**',
  '**/node_modules/**',
  ...UNCHECKED_FOLDERS.map((folder) => `${folder}/**`)
];
