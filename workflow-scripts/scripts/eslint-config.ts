import type { Linter } from 'eslint';

import { defineEslintConfigs } from '@mnaoumov/typescript-dev-toolkit/linters/eslint-config';
import { defineConfig } from 'eslint/config';

/*
 * Built on the shared configuration `@mnaoumov/typescript-dev-toolkit` exports, not copied from it. Everything below
 * is where this package deliberately differs, each with its reason.
 */

const typeScriptFiles = [
  '**/*.ts',
  '**/*.mts'
];

export const config: Linter.Config[] = defineEslintConfigs({
  customConfigs: (context) =>
    defineConfig({
      /*
       * Every file in this package is a script run from a terminal or from CI, so printing is the job. The root
       * package scopes this to its scripts because the package around them is a typings surface; here every file is
       * one.
       */
      files: context.allFiles(),
      rules: {
        'no-console': 'off'
      }
    }),
  editContext: (context) => {
    /*
     * The shared layout puts sources under `src` and scripts under `scripts`. This package has no `src`, and its
     * `scripts/` holds only the three files that build its own tooling: every release-critical script sits at the
     * package root or under `helpers/`. Matched against the shared layout, those files would match no glob at all,
     * which ESLint reports as a warning and nothing more. So the whole package is scripts.
     *
     * `sourceFiles` keeps its shared `src/**` globs, which match nothing here, rather than being emptied: the shared
     * Node-floor block is scoped to that list, and ESLint rejects a config whose `files` is an empty array.
     */
    context.scriptFiles.splice(0, Infinity, ...typeScriptFiles);
    // The tests sit beside the helpers they cover, under `helpers/`, which the shared test globs do not reach.
    context.testFiles.push('**/*.test.ts');
  }
});
