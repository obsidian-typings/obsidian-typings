/*
 * Directories excluded from every markdown check.
 *
 * The `node_modules`, `dist` and `.git` entries are globstar-prefixed on purpose: the repo carries nested
 * `node_modules` trees (under `docs/`, `workflow-scripts/` and `tests/bundle-compat/scenario-*`), and a
 * root-anchored `node_modules` pattern leaves those unpruned - which is what made the file walk in
 * `npm run lint:md` never finish. `docs` and `workflow-scripts` stay root-anchored: they name specific
 * directories of this repo, not names that may recur deeper in the tree.
 */
export const mdIgnores = [
  '**/.git/**',
  '**/dist/**',
  '**/node_modules/**',
  'docs/**',
  'workflow-scripts/**'
];
