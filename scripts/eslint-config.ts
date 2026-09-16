import type { Linter } from 'eslint';

import commentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs';
import { includeIgnoreFile } from '@eslint/config-helpers';
import eslint from '@eslint/js';
// eslint-disable-next-line import-x/no-rename-default -- The default export name `plugin` is too confusing.
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
// eslint-disable-next-line import-x/no-rename-default -- The default export name `plugin` is too confusing.
import astro from 'eslint-plugin-astro';
import { flatConfigs as eslintPluginImportXFlatConfigs } from 'eslint-plugin-import-x';
import { configs as perfectionistConfigs } from 'eslint-plugin-perfectionist';
// eslint-disable-next-line import-x/no-rename-default -- The default export name `plugin` is too confusing.
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';
import { existsSync } from 'node:fs';
import { join } from 'node:path/posix';
// eslint-disable-next-line import-x/no-rename-default -- The default export name `_default` is too confusing.
import tseslint from 'typescript-eslint';

import { localPlugin } from './helpers/eslint/local-plugin.ts';
import { getRootFolder } from './helpers/root.ts';

const typeScriptFiles = [
  'src/**/*.ts',
  'docs/**/*.ts',
  'scripts/**/*.ts'
];

/*
 * `eslint-plugin-jsdoc` and `eslint-plugin-tsdoc` are deliberately absent, and this note exists so the next
 * comparison against `obsidian-dev-utils` reads that as a decision rather than as drift to close.
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

export const config: Linter.Config[] = defineConfig(
  ...getGitIgnoreConfigs(),
  ...getAstroConfigs(),
  ...getEslintConfigs(),
  ...getLocalPluginConfigs(),
  ...getTseslintConfigs(),
  ...getStylisticConfigs(),
  ...getImportXConfigs(),
  ...getPerfectionistConfigs(),
  ...getUnicornConfigs(),
  ...getEslintImportResolverTypescriptConfigs(),
  ...getEslintCommentsConfigs(),
  ...getDocsOverrideConfigs()
);

function getAstroConfigs(): Linter.Config[] {
  // eslint-disable-next-line import-x/no-named-as-default-member -- `configs` is the plugin's configuration namespace.
  return defineConfig(astro.configs.recommended);
}

function getDocsOverrideConfigs(): Linter.Config[] {
  return defineConfig([
    {
      files: ['docs/scripts/astro-config.ts'],
      rules: {
        'no-magic-numbers': 'off'
      }
    },
    {
      files: ['docs/src/pages/**/*.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        'import-x/no-anonymous-default-export': 'off',
        'import-x/no-default-export': 'off',
        'import-x/no-unresolved': 'off',
        'no-magic-numbers': 'off',
        'no-restricted-syntax': 'off'
      }
    }
  ]);
}

function getEslintCommentsConfigs(): Linter.Config[] {
  return defineConfig([
    {
      // eslint-disable-next-line import-x/no-named-as-default-member -- The default export name `recommended` is too confusing.
      extends: [commentsConfigs.recommended],
      files: typeScriptFiles,
      rules: {
        '@eslint-community/eslint-comments/require-description': 'error'
      }
    }
  ]);
}

function getEslintConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [eslint.configs.recommended],
      files: typeScriptFiles,
      rules: {
        'accessor-pairs': 'error',
        'array-callback-return': 'error',
        'camelcase': 'error',
        /*
         * The rule reports per comment TOKEN, so every continuation line of a wrapped `//` comment is its own token
         * that would have to start with a capital — which is how prose ends up with capitals mid-sentence.
         * `ignoreConsecutiveComments` exempts a line comment that directly follows another one, which is exactly the
         * shape of a wrapped block, while still holding its FIRST line to a capital. Block comments need no such
         * option: a block comment is a single token however many lines it spans.
         * `ignorePattern` covers the half that leaves behind: a comment whose FIRST word is a camelCase identifier is
         * exempt, so a comment that opens by naming a symbol keeps the name a reader can grep instead of a PascalCase
         * one that exists nowhere. The rule anchors the pattern at the start of the comment and `[a-zA-Z0-9]` matches
         * no whitespace, so it can only ever match that first word — ordinary lowercase prose stays reported. Both
         * option bags need it, and `block` keeps its `v8` exemption by alternation rather than losing it.
         */
        'capitalized-comments': [
          'error',
          'always',
          {
            block: { ignorePattern: 'v8|[a-z][a-zA-Z0-9]*[A-Z]' },
            line: { ignoreConsecutiveComments: true, ignorePattern: '[a-z][a-zA-Z0-9]*[A-Z]' }
          }
        ],
        'complexity': 'error',
        'consistent-this': 'error',
        'curly': 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'default-param-last': 'error',
        'eqeqeq': 'error',
        'func-name-matching': 'error',
        'func-names': 'error',
        'func-style': [
          'error',
          'declaration',
          {
            allowArrowFunctions: false
          }
        ],
        'grouped-accessor-pairs': [
          'error',
          'getBeforeSet'
        ],
        'guard-for-in': 'error',
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-console': [
          'error',
          {
            allow: [
              'warn',
              'error'
            ]
          }
        ],
        'no-constructor-return': 'error',
        'no-div-regex': 'error',
        'no-else-return': [
          'error',
          {
            allowElseIf: false
          }
        ],
        'no-empty-function': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-implicit-coercion': [
          'error',
          {
            allow: [
              '!!'
            ]
          }
        ],
        'no-implied-eval': 'error',
        'no-inner-declarations': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': [
          'error',
          {
            detectObjects: true,
            enforceConst: true,
            ignore: [
              -1,
              0,
              1
            ]
          }
        ],
        'no-multi-assign': 'error',
        'no-multi-str': 'error',
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-object-constructor': 'error',
        'no-octal-escape': 'error',
        'no-promise-executor-return': 'error',
        'no-proto': 'error',
        'no-restricted-syntax': [
          'error',
          {
            message: 'Do not use definite assignment assertions (!). Initialize the field or make it optional.',
            selector: 'PropertyDefinition[definite=true]'
          },
          {
            message: 'Do not use definite assignment assertions (!) on abstract fields.',
            selector: 'TSAbstractPropertyDefinition[definite=true]'
          },
          {
            message: 'Do not use anonymous inline object types. Define a named interface or `type` alias instead.',
            selector: 'TSTypeLiteral:not(TSTypeAliasDeclaration > TSTypeLiteral)'
          },
          {
            message: 'Do not use anonymous inline mapped types. Define a named `type` alias instead.',
            selector: 'TSMappedType:not(TSTypeAliasDeclaration > TSMappedType)'
          },
          {
            message: 'Do not use override on __ methods. Use a numbered variant instead, e.g., method2__().',
            selector: 'MethodDefinition[override=true][key.name=/.*__$/]'
          },
          {
            message: 'Do not use double type assertions (as X as Y). Use createMockOf<T>() from src/internal/cast.ts instead.',
            selector: 'TSAsExpression > TSAsExpression'
          },
          {
            message: 'Do not use `as never`. It silently satisfies type constraints by claiming "this value is of every type" — almost always masks a real type mismatch. Fix the underlying types instead.',
            selector: 'TSAsExpression > TSNeverKeyword'
          },
          {
            message: 'Do not use `<never>` type assertions. Same reasoning as `as never`.',
            selector: 'TSTypeAssertion > TSNeverKeyword'
          },
          {
            message: 'Do not use _ prefix on methods or functions. The _ prefix is for unused parameters only.',
            selector: 'MethodDefinition[key.name=/^_/]:not([override=true])'
          },
          {
            message: 'Do not use _ prefix on methods or functions. The _ prefix is for unused parameters only.',
            selector: 'FunctionDeclaration[id.name=/^_/]'
          },
          {
            message: 'Do not rename imports with "Mock" in the alias. Mock classes are the canonical types in this project — use the original name.',
            selector: 'ImportSpecifier[local.name=/Mock/]:not([imported.name=/Mock/])'
          },
          {
            message: 'Avoid dynamic import(). Use static imports instead. Only use dynamic imports for lazy/conditional loading.',
            selector: 'ImportExpression'
          },
          {
            message: 'Do not use `{} as T`. Use `createMockOf<T>()` from src/internal/cast.ts instead.',
            selector: 'TSAsExpression > ObjectExpression[properties.length=0]'
          },
          {
            message: 'Do not use `declare` on class properties. Initialize the property or use a regular type annotation.',
            selector: 'PropertyDefinition[declare=true]'
          }
        ],
        'no-return-assign': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unreachable-loop': 'error',
        'no-unused-expressions': 'error',
        'no-useless-assignment': 'error',
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-void': 'error',
        'object-shorthand': 'error',
        'operator-assignment': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-exponentiation-operator': 'error',
        'prefer-named-capture-group': 'error',
        'prefer-numeric-literals': 'error',
        'prefer-object-has-own': 'error',
        'prefer-object-spread': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'radix': 'error',
        'require-atomic-updates': 'error',
        'require-await': 'error',
        'symbol-description': 'error',
        'unicode-bom': 'error',
        'vars-on-top': 'error',
        'yoda': 'error'
      }
    },
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
       * printing to stdout is what they are for. Kept as a deliberate local override rather than drift: the shared
       * config in `obsidian-dev-utils` leaves the rule on everywhere, because nothing in that package prints.
       */
      files: ['scripts/**/*.ts'],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['scripts/helpers/@types/markdownlint-cli2-config-schema.d.ts'],
      rules: {
        'no-restricted-syntax': 'off'
      }
    },
    {
      files: ['**/*.test.ts', 'scripts/eslint-config.ts'],
      rules: {
        'no-magic-numbers': 'off'
      }
    }
  ]);
}

function getEslintImportResolverTypescriptConfigs(): Linter.Config[] {
  return defineConfig([
    {
      settings: {
        'import-x/resolver-next': [
          createTypeScriptImportResolver({
            alwaysTryTypes: true
          })
        ]
      }
    }
  ]);
}

function getGitIgnoreConfigs(): Linter.Config[] {
  const gitignorePath = join(getRootFolder() ?? '', '.gitignore');
  if (!existsSync(gitignorePath)) {
    return [];
  }
  return [includeIgnoreFile(gitignorePath)];
}

function getImportXConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [
        eslintPluginImportXFlatConfigs.recommended,
        eslintPluginImportXFlatConfigs.typescript,
        eslintPluginImportXFlatConfigs.errors,
        eslintPluginImportXFlatConfigs.warnings
      ],
      files: typeScriptFiles,
      rules: {
        'import-x/consistent-type-specifier-style': 'error',
        'import-x/extensions': ['error', 'ignorePackages'],
        'import-x/first': 'error',
        'import-x/imports-first': 'error',
        'import-x/newline-after-import': 'error',
        'import-x/no-absolute-path': 'error',
        'import-x/no-amd': 'error',
        'import-x/no-anonymous-default-export': 'error',
        'import-x/no-commonjs': 'error',
        'import-x/no-cycle': 'error',
        'import-x/no-default-export': 'error',
        'import-x/no-deprecated': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/no-dynamic-require': 'error',
        'import-x/no-empty-named-blocks': 'error',
        'import-x/no-extraneous-dependencies': 'error',
        'import-x/no-import-module-exports': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-named-default': 'error',
        'import-x/no-namespace': 'error',
        'import-x/no-nodejs-modules': 'error',
        'import-x/no-relative-packages': 'error',
        'import-x/no-restricted-paths': 'error',
        'import-x/no-self-import': 'error',
        'import-x/no-unassigned-import': [
          'error',
          {
            allow: [
              '**/*.css',
              '**/*.sass',
              '**/*.scss'
            ]
          }
        ],
        'import-x/no-unused-modules': 'off',
        'import-x/no-useless-path-segments': 'error',
        'import-x/no-webpack-loader-syntax': 'error'
      }
    },
    {
      files: ['**/scripts/**/*.ts'],
      rules: {
        'import-x/no-nodejs-modules': 'off'
      }
    }
  ]);
}

function getLocalPluginConfigs(): Linter.Config[] {
  return defineConfig([{
    files: typeScriptFiles,
    plugins: {
      local: localPlugin
    },
    rules: {
      'local/no-unused-params-members': 'error',
      'local/no-used-underscore-variables': 'error',
      'local/readonly-params-options-result-members': 'error'
    }
  }]);
}

function getPerfectionistConfigs(): Linter.Config[] {
  return defineConfig([{
    extends: [perfectionistConfigs['recommended-alphabetical']],
    files: typeScriptFiles
  }]);
}

function getStylisticConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [
        stylistic.configs.recommended,
        stylistic.configs.customize({
          arrowParens: true,
          braceStyle: '1tbs',
          commaDangle: 'never',
          semi: true
        })
      ],
      files: typeScriptFiles,
      rules: {
        '@stylistic/indent': 'off',
        '@stylistic/indent-binary-ops': 'off',
        '@stylistic/jsx-one-expression-per-line': 'off',
        '@stylistic/no-extra-semi': 'error',
        '@stylistic/object-curly-newline': [
          'error',
          {
            ExportDeclaration: {
              minProperties: 2,
              multiline: true
            },
            ImportDeclaration: {
              minProperties: 2,
              multiline: true
            }
          }
        ],
        '@stylistic/operator-linebreak': [
          'error',
          'before',
          {
            overrides: {
              '=': 'after'
            }
          }
        ],
        '@stylistic/quotes': [
          'error',
          'single',
          {
            allowTemplateLiterals: 'never'
          }
        ]
      }
    }
  ]);
}

function getTseslintConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [
        // eslint-disable-next-line import-x/no-named-as-default-member -- The default export name `_default` is too confusing.
        ...tseslint.configs.strictTypeChecked,
        // eslint-disable-next-line import-x/no-named-as-default-member -- The default export name `_default` is too confusing.
        ...tseslint.configs.stylisticTypeChecked
      ],
      files: typeScriptFiles,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          projectService: true,
          tsconfigRootDir: getRootFolder() ?? ''
        }
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-member-accessibility': 'error',
        // The rule's own `property` default, spelled as a bare severity so it stays the rule's default rather than a copy of it.
        // Do NOT pass `'method'` for tidiness: the method form keeps parameters bivariant, drops `readonly` (the rule's own fixer
        // message says so), and makes `@typescript-eslint/unbound-method` fire on every forwarded bag member, which is what the
        // `this: void` boilerplate used to pay for. Do NOT delete the line either - the rule is in no preset, so that turns it off.
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/no-floating-promises': ['error', {
          checkThenables: true
        }],
        '@typescript-eslint/no-invalid-void-type': ['error', {
          allowAsThisParameter: true
        }],
        '@typescript-eslint/no-this-alias': ['error', {
          allowedNames: [
            'that'
          ]
        }],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/prefer-readonly': 'error'
      }
    },
    {
      settings: {
        react: {
          version: 'detect'
        }
      }
    }
  ]);
}

function getUnicornConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [unicorn.configs.recommended],
      files: typeScriptFiles,
      rules: {
        'unicorn/consistent-boolean-name': [
          'error',
          {
            prefixes: {
              allows: true,
              check: true,
              contains: true,
              does: true,
              includes: true,
              must: true,
              needs: true,
              supports: true
            }
          }
        ],
        /*
         * `node:path` members are imported by name throughout this repo, consistently with every other `node:`
         * module it uses. Configure the rule to enforce the style actually in use rather than annotate 8 sites
         * that are not going to change.
         */
        'unicorn/import-style': [
          'error',
          {
            styles: {
              // Keyed by the UNPREFIXED module name: the rule's own table uses `path`, so a `node:path` key never matches.
              path: {
                named: true
              }
            }
          }
        ],
        /*
         * The default of 3 reports the ordinary root-resolution idiom this repo opens its scripts with:
         * `dirname(dirname(toPosixPath(fileURLToPath(import.meta.url))))` is four deep and appears in five
         * scripts. Raising the limit by one clears every report here while still catching genuinely
         * unreadable nesting.
         */
        'unicorn/max-nested-calls': [
          'error',
          {
            max: 4
          }
        ],
        'unicorn/name-replacements': [
          'error',
          {
            /*
             * Property names are checked too, so an abbreviation cannot survive by living on an object.
             *
             * The entries below are this repo's established vocabulary, not abbreviations to be expanded:
             *
             * - `doc` / `docs` name the thing this repo builds. The whole `docs/` tree, the `docsDir` paths and
             *   the npm scripts all spell it that way, and expanding it picks the wrong word anyway: the
             *   `api-doc-*` modules generate API *documentation*, not documents.
             * - `param` / `params` is the parameter-bag convention, and it is load-bearing rather than stylistic:
             *   the local `readonly-params-options-result-members` rule matches interface names ending `Params`,
             *   so expanding the word would silently take every bag out of that rule's scope.
             * - `prop` / `props` is the component and TypeScript-property vocabulary the generator is written in.
             * - `src` names the `src/` folder; `attr` / `attrs` and `desc` name the HTML attributes the generator
             *   emits; `ref` / `refs` reads as a pair with the API surface it documents.
             * - `dev` is Astro's own: `devToolbar` is a key in its config type, and `dev` / `dev-setup` are npm
             *   script names. Only the `direction` expansion of `dir` is dropped -- every `dir` here is a
             *   filesystem directory -- so `dir` itself still expands to `directory`.
             */
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
         * `.sort()` here always runs on an array the surrounding function just built, so the mutation the rule
         * warns about reaches nobody -- but proving that at each of the 11 sites is the whole cost, and this
         * branch carries no test suite to catch a site where it is not true. Off rather than half-checked; the
         * shared config in `obsidian-dev-utils` reaches the same answer.
         */
        'unicorn/no-array-sort': 'off',
        'unicorn/no-break-in-nested-loop': 'off',
        /*
         * `null` is the not-found sentinel these helpers are built on -- `getRootFolder(): null | string`,
         * `detectPackageManagerFromPackageJson(): null | PackageManager` -- and several of them are copies
         * shared with sibling repos that spell it the same way. Swapping 25 sites to `undefined` would change
         * the published shape of the helpers and diverge the copies at the same time.
         */
        'unicorn/no-null': 'off',
        'unicorn/no-top-level-assignment-in-function': 'off',
        /*
         * The only shape it reports here is `const [, , ...rest] = process.argv`, the argv idiom seven script
         * entry points open with. Its fix rewrites that to `process.argv.slice(2)`, which trades a named skip
         * for a bare `2` -- and this config runs `no-magic-numbers` with `ignore: [-1, 0, 1]`, so the autofix
         * only moves the report from one rule to another. Off, as the shared config also has it.
         */
        'unicorn/no-unreadable-array-destructuring': 'off',
        'unicorn/no-unreadable-for-of-expression': 'off',
        'unicorn/prefer-array-from-async': 'off',
        'unicorn/prefer-iterator-to-array': 'off',
        'unicorn/prefer-number-coercion': 'off',
        'unicorn/prefer-simple-condition-first': 'off',
        /*
         * Unsatisfiable alongside `perfectionist/sort-union-types`, which this config takes from
         * `recommended-alphabetical` as a plain alphabetical sort. This rule wants object type literals last;
         * the sort wants them wherever the alphabet puts them. Measured rather than assumed: with this rule on
         * and unfixed, perfectionist reports 0 and this rule reports 66; after its autofix the two counts swap
         * exactly, 66 to 0. Both are `error` and neither concedes, so no arrangement of those 66 unions
         * satisfies both. The alphabetical sort is the incumbent, so it keeps precedence.
         */
        'unicorn/prefer-type-literal-last': 'off',
        'unicorn/require-array-sort-compare': 'off',
        // Every one of the 22 sites already spells it `utf-8`, which is also what the shared config asks for.
        'unicorn/text-encoding-identifier-case': [
          'error',
          {
            withDash: true
          }
        ]
      }
    },
    {
      /*
       * The build, lint, format and docs scripts are CLI entry points whose exit status IS their interface --
       * the same reason `no-console` is relaxed for them above.
       */
      files: ['scripts/**/*.ts', 'docs/scripts/**/*.ts'],
      rules: {
        'unicorn/no-process-exit': 'off'
      }
    },
    {
      /*
       * These modules walk `hast` trees, not the DOM. A hast element has `children` and no `firstElementChild`,
       * so the rule's advice does not compile here.
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
       * This file names almost nothing of its own: its object keys are other tools' option names.
       * `tsconfigRootDir` belongs to the `typescript-eslint` parser, `args` / `argsIgnorePattern` /
       * `varsIgnorePattern` to `@typescript-eslint/no-unused-vars`, and `dir` is a key in this very rule's own
       * `replacements` bag. Renaming any of them would not rename the thing being configured; it would just
       * stop configuring it.
       */
      files: ['scripts/eslint-config.ts'],
      rules: {
        'unicorn/name-replacements': 'off'
      }
    }
  ]);
}
