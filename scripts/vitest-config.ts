import { defineConfig } from 'vitest/config';

const SHARED_EXCLUDE = ['node_modules', 'dist'];
const SCRIPTS_TEST_FILES = 'scripts/**/*.test.ts';
const WORKFLOW_SCRIPTS_TEST_FILES = 'workflow-scripts/**/*.test.ts';

export const config = defineConfig({
  test: {
    exclude: SHARED_EXCLUDE,
    globals: false,
    projects: [
      {
        // The scripts tree is plain Node tooling: the vendored ESLint rules are tested with the typescript-eslint
        // rule tester, which needs the real Node runtime. It keeps the name the other repositories vendoring these
        // rules give it.
        test: {
          environment: 'node',
          exclude: [...SHARED_EXCLUDE],
          include: [SCRIPTS_TEST_FILES],
          name: 'unit-tests:scripts'
        }
      },
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
      }
    ]
  }
});
