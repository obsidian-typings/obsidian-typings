import { defineConfig } from 'vitest/config';

const SHARED_EXCLUDE = ['node_modules', 'dist'];
const SCRIPTS_TEST_FILES = 'scripts/**/*.test.ts';

export const config = defineConfig({
  test: {
    exclude: SHARED_EXCLUDE,
    globals: false,
    projects: [
      {
        // The scripts tree is plain Node tooling: the vendored ESLint rules are tested with the typescript-eslint
        // rule tester, which needs the real Node runtime. No branch of this repo has another test project, so this
        // is the only one; it keeps the name the other repositories vendoring these rules give it.
        test: {
          environment: 'node',
          exclude: [...SHARED_EXCLUDE],
          include: [SCRIPTS_TEST_FILES],
          name: 'unit-tests:scripts'
        }
      }
    ]
  }
});
