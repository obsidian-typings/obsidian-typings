import { defineConfig } from 'vitest/config';

const DOCS_TEST_FILES = 'docs/scripts/**/*.test.ts';
const SHARED_EXCLUDE = ['node_modules', 'dist'];
const WORKFLOW_SCRIPTS_TEST_FILES = 'workflow-scripts/**/*.test.ts';

export const config = defineConfig({
  test: {
    exclude: SHARED_EXCLUDE,
    globals: false,
    projects: [
      {
        // `workflow-scripts` is a separate npm package, but it is tested from HERE rather than with a vitest of
        // its own: a second install under `workflow-scripts/node_modules` would hand a test importing `vitest` a
        // different instance from the runner executing it. Its own imports (`semver`) still resolve through its
        // own install, which `verify.yml` performs before `npm test`. Only `main` has this project -- the
        // release branches `.gitignore` `/workflow-scripts`.
        test: {
          environment: 'node',
          exclude: [...SHARED_EXCLUDE, 'workflow-scripts/node_modules'],
          include: [WORKFLOW_SCRIPTS_TEST_FILES],
          name: 'unit-tests:workflow-scripts'
        }
      },
      {
        // `docs` is the third npm package, tested from here for the same reason `workflow-scripts` is: its
        // tests take `vitest` from the root install, and its own imports (`unist-util-visit`) resolve through
        // its own install, which `verify.yml` also performs before `npm test`.
        test: {
          environment: 'node',
          exclude: [...SHARED_EXCLUDE, 'docs/node_modules'],
          include: [DOCS_TEST_FILES],
          name: 'unit-tests:docs'
        }
      }
    ]
  }
});
