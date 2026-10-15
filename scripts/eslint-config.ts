import type { Linter } from 'eslint';

import { defineEslintConfigs } from '@mnaoumov/typescript-dev-toolkit/linters/eslint-config';
// eslint-disable-next-line import-x/no-rename-default -- The default export name `plugin` is too confusing.
import astro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';

/*
 * Built on the shared configuration `@mnaoumov/typescript-dev-toolkit` exports, not copied from it. Everything below
 * is where this package deliberately differs, each with its reason; the shared layers themselves are not repeated here.
 *
 * `eslint-plugin-jsdoc` and `eslint-plugin-tsdoc` are deliberately absent, and the shared configuration does not load
 * them either, so declining them takes no override.
 *
 * Every repo that loads them scopes them to its published surface -- `src/**` -- and never to its tooling.
 * Applied here at that scope they reach nothing: `src/` is not committed on `main` (`git ls-files src` is
 * empty), it appears only once a release branch is checked out, and it is then several thousand `.d.ts`
 * files transcribing Obsidian's own API. Turning `jsdoc/require-jsdoc` and `tsdoc/syntax` on over THAT is a
 * documentation project running inside the release gate, not a configuration change.
 *
 * Pointing them at the tooling instead is the other option, and it is one nothing else here does. Measured
 * on 2026-09-15 over `scripts/`, `docs/scripts/` and `docs/src/`: 380 reports, led by `require-jsdoc` (140),
 * `require-param` (71), `require-file-overview` (54) and `require-returns` (40). Their fixers only insert
 * empty blocks, which `jsdoc/no-blank-blocks` then rejects, so roughly 305 of those need prose written by
 * someone who knows what each build script is for.
 *
 * Revisit if `src/` ever lands on `main`, which is the condition that makes the ordinary scope meaningful.
 */

export const config: Linter.Config[] = defineEslintConfigs({
  customConfigs: (context) =>
    defineConfig(
      // eslint-disable-next-line import-x/no-named-as-default-member -- `configs` is the plugin's configuration namespace.
      astro.configs.recommended,
      {
        files: ['src/obsidian/**/*.ts'],
        rules: {
          'no-constructor-return': 'off',
          'no-restricted-imports': ['error', {
            paths: [{
              message: 'Do not import obsidian-typings in src/obsidian/. Inline needed type shapes in src/internal/types.ts instead.',
              name: 'obsidian-typings'
            }],
            patterns: [{
              group: ['obsidian-typings/*'],
              message: 'Do not import obsidian-typings in src/obsidian/. Inline needed type shapes in src/internal/types.ts instead.'
            }]
          }]
        }
      },
      {
        /*
         * The build, lint, format, docs and version scripts are CLI entry points whose output IS their interface, so
         * printing to stdout is what they are for. The shared configuration leaves the rule on everywhere, because
         * nothing in the package it was written for prints.
         */
        files: context.scriptFiles,
        rules: {
          'no-console': 'off'
        }
      },
      {
        files: context.allFiles(),
        rules: {
          /*
           * The shared configuration's list, with this repo's own vocabulary added and three of its entries left out.
           * The options replace the shared ones whole, so every entry this repo keeps is restated.
           *
           * - `doc` / `docs` name the thing this repo builds. The whole `docs/` tree, the `docsDir` paths and the npm
           *   scripts all spell it that way, and expanding it picks the wrong word anyway: the `api-doc-*` modules
           *   generate API *documentation*, not documents.
           * - `param` / `params` is the parameter-bag convention, and it is load-bearing rather than stylistic: the
           *   in-house `readonly-params-options-result-members` rule matches interface names ending `Params`, so
           *   expanding the word would silently take every bag out of that rule's scope.
           * - `prop` / `props` is the component and TypeScript-property vocabulary the generator is written in.
           * - `src` names the `src/` folder; `attr` / `attrs` and `desc` name the HTML attributes the generator
           *   emits; `ref` / `refs` reads as a pair with the API surface it documents.
           * - `dev` is Astro's own: `devToolbar` is a key in its config type, and `dev` / `dev-setup` are npm script
           *   names. Only the `direction` expansion of `dir` is dropped -- every `dir` here is a filesystem
           *   directory -- so `dir` itself still expands to `directory`.
           * - `dist`, `el` and `lib`, which the shared list allows, are not this repo's vocabulary, so they are
           *   expanded here.
           */
          'unicorn/name-replacements': [
            'error',
            {
              checkProperties: true,
              replacements: {
                attr: false,
                attrs: false,
                desc: false,
                dev: false,
                dir: {
                  direction: false
                },
                doc: false,
                docs: false,
                env: false,
                param: false,
                params: false,
                prop: false,
                props: false,
                ref: false,
                refs: false,
                src: false,
                util: false,
                utils: false
              }
            }
          ],
          /*
           * Measured with the rule on: a module-level memo in `docs/scripts/helpers/api-doc-link-rendering.ts`, which
           * is production code here, so the rule is off repo-wide rather than only over test files the way the shared
           * configuration scopes it.
           */
          'unicorn/no-top-level-assignment-in-function': 'off',
          /*
           * Unsatisfiable alongside `perfectionist/sort-union-types`, which the shared configuration takes from
           * `recommended-alphabetical` as a plain alphabetical sort. This rule wants object type literals last; the
           * sort wants them wherever the alphabet puts them. Measured rather than assumed: with this rule on and
           * unfixed, perfectionist reports 0 and this rule reports 66; after its autofix the two counts swap exactly,
           * 66 to 0. Both are `error` and neither concedes, so no arrangement of those 66 unions satisfies both. The
           * alphabetical sort is the incumbent, so it keeps precedence.
           */
          'unicorn/prefer-type-literal-last': 'off'
        }
      },
      {
        // After the block above, which turns `unicorn/name-replacements` back on everywhere: flat config is last-wins.
        files: ['scripts/eslint-config.ts'],
        rules: {
          'no-magic-numbers': 'off',
          /*
           * This file names almost nothing of its own: its object keys are other tools' option names, and `dir` is a
           * key in that very rule's own `replacements` bag. Renaming any of them would not rename the thing being
           * configured; it would just stop configuring it.
           */
          'unicorn/name-replacements': 'off'
        }
      },
      {
        /*
         * These modules walk `hast` trees, not the DOM. A hast element has `children` and no `firstElementChild`, so
         * the rule's advice does not compile here.
         */
        files: ['docs/scripts/helpers/remark-plugins/**/*.ts'],
        rules: {
          'unicorn/better-dom-traversing': 'off'
        }
      },
      {
        /*
         * An Astro component's declaration file has to carry the component's own name -- `LinkCardIcon.astro.d.ts`
         * declares `LinkCardIcon.astro` -- so kebab-casing it would break the pairing Astro resolves by.
         */
        files: ['**/*.astro.d.ts'],
        rules: {
          'unicorn/filename-case': 'off'
        }
      },
      {
        /*
         * Declarations of the `virtual:starlight/*` modules the Starlight component overrides import, which Starlight
         * 0.42 stopped shipping (see `AGENTS.md`). The file mirrors a module surface it does not own: those modules
         * export defaults, so `import-x/no-default-export` has nothing to offer -- an ambient declaration cannot
         * rename an export that already exists, and declaring a named one would describe a module that is not there.
         */
        files: ['docs/src/starlight-virtual-modules.d.ts'],
        rules: {
          'import-x/no-default-export': 'off'
        }
      }
    ),
  editContext: (context) => {
    /*
     * `docs/` is a package of its own with no ESLint config, so the config nearest to its files is this one. Its build
     * scripts are scripts; the rest of it is the site's own source.
     */
    context.scriptFiles.push('docs/scripts/**/*.ts');
    context.sourceFiles.push('docs/**/*.ts');
    context.testFiles.push('docs/**/*.test.ts');
  }
});
