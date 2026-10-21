import type { Linter } from 'eslint';

import commentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs';
import { includeIgnoreFile } from '@eslint/config-helpers';
import eslint from '@eslint/js';
import { defineEslintConfigs } from '@mnaoumov/typescript-dev-toolkit/linters/eslint-config';
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { flatConfigs as eslintPluginImportXFlatConfigs } from 'eslint-plugin-import-x';
// eslint-disable-next-line import-x/no-named-as-default -- The default export name `index` is too confusing.
import jsdoc from 'eslint-plugin-jsdoc';
import nodePlugin from 'eslint-plugin-n';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginTsdoc from 'eslint-plugin-tsdoc';
import { defineConfig } from 'eslint/config';
import { resolve } from 'node:path';
import tseslint from 'typescript-eslint';

import { obsidianTypingsPlugin } from './helpers/eslint-plugin-obsidian-typings/index.ts';

const gitignorePath = resolve(import.meta.dirname, '..', '.gitignore');

const sourceFiles = ['src/**/*.ts', 'src/**/*.d.ts'];
const declarationFiles = ['src/**/*.d.ts'];

/*
 * The repo's own tooling: the build scripts and the configuration files at the root. This is the scope the shared
 * configuration is applied to, and nothing else.
 */
const toolingFiles = ['*.mts', '*.ts', 'scripts/**/*.ts'];

// The minimum Obsidian installer that still receives app updates (0.14.5) ships Electron 18.0.3, which runs Node 16.13.2.
// Shipped code must therefore avoid Node/ES runtime features unavailable in that version. Scripts are dev-only and exempt.
const minimumNodeVersion = '>=16.13.2';

/*
 * Two layers, over two disjoint sets of files.
 *
 * The tooling is built on the shared configuration `@mnaoumov/typescript-dev-toolkit` exports, type-aware, exactly as
 * `main`'s is. `extends` with `files` intersects every shared layer's globs with `toolingFiles`, so none of them reaches
 * `src/`; the shared global ignores stay global.
 *
 * `src/` keeps a layer of its own, below, and it is deliberately not built on the shared configuration. `src/` is
 * several thousand `.d.ts` files transcribing someone else's API, and the shared rule set contradicts the conventions
 * that transcription follows. Measured on 2026-10-15 over `release/obsidian-catalyst/1.14.4`, with type-aware linting
 * switched off: 15,217 findings in `src/`, led by `@typescript-eslint/method-signature-style` (4,890: this repo mandates
 * method shorthand), `@typescript-eslint/unified-signatures` (2,526: the overloads are the real API's),
 * `unicorn/filename-case` (1,705: one interface per file, named after it), `unicorn/name-replacements` (1,251: Obsidian's
 * own member names) and `typescript-dev-toolkit/readonly-params-options-result-members` (643: the objects are mutable).
 * Building `src/` on the export would mean turning most of it back off there, which is a hand copy with extra steps.
 * `src/` is linted without type information, so no type-aware rule may be turned on in that layer.
 */
export const config: Linter.Config[] = defineConfig([
  includeIgnoreFile(gitignorePath),
  {
    extends: [
      defineEslintConfigs({
        customConfigs: (context) =>
          defineConfig([
            {
              // The build scripts are CLI entry points whose output IS their interface.
              files: context.scriptFiles,
              rules: {
                'no-console': 'off'
              }
            },
            {
              /*
               * These two files configure other tools, so their keys are those tools' option names and their values
               * are those tools' option values: renaming `siblings_only` would not rename the option, it would stop
               * setting it. The imports are the plugins' own documented ones, and `configs` / `recommended` are the
               * configuration namespaces those plugins publish.
               */
              files: ['scripts/eslint-config.ts', 'scripts/markdownlint-cli2-config.ts'],
              rules: {
                'camelcase': 'off',
                'import-x/no-named-as-default-member': 'off',
                'import-x/no-rename-default': 'off',
                'no-magic-numbers': 'off'
              }
            }
          ])
      })
    ],
    files: toolingFiles
  },
  ...getEslintConfigs(),
  ...getTseslintConfigs(),
  ...getStylisticConfigs(),
  ...getImportXConfigs(),
  ...getPerfectionistConfigs(),
  ...getEslintImportResolverTypescriptConfigs(),
  ...getEslintCommentsConfigs(),
  ...getNoRestrictedSyntaxRulesConfigs(),
  ...getNodeCompatConfigs(),
  ...getObsidianTypingsConfigs(),
  ...getOverrideConfigs(),
  ...getJsdocsConfigs(),
  ...getTsdocsConfigs()
]);

function getEslintCommentsConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [commentsConfigs.recommended],
      files: sourceFiles,
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
      files: sourceFiles,
      rules: {
        'curly': 'error',
        'eqeqeq': 'error',
        'no-console': [
          'error',
          {
            allow: [
              'warn',
              'error'
            ]
          }
        ],
        'no-else-return': [
          'error',
          {
            allowElseIf: false
          }
        ],
        'no-implicit-coercion': [
          'error',
          {
            allow: [
              '!!'
            ]
          }
        ],
        'no-lonely-if': 'error',
        'no-nested-ternary': 'error',
        'no-return-assign': 'error',
        'no-sequences': 'error',
        'no-template-curly-in-string': 'error',
        'no-unneeded-ternary': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-object-spread': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'yoda': 'error'
      }
    }
  ]);
}

function getEslintImportResolverTypescriptConfigs(): Linter.Config[] {
  return defineConfig([
    {
      files: sourceFiles,
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

function getImportXConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [
        eslintPluginImportXFlatConfigs.recommended,
        eslintPluginImportXFlatConfigs.typescript,
        eslintPluginImportXFlatConfigs.errors,
        eslintPluginImportXFlatConfigs.warnings
      ],
      files: sourceFiles,
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
        'import-x/no-default-export': 'off',
        'import-x/no-deprecated': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/no-dynamic-require': 'error',
        'import-x/no-empty-named-blocks': 'error',
        'import-x/no-extraneous-dependencies': 'error',
        'import-x/no-import-module-exports': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-named-as-default-member': 'off',
        'import-x/no-named-default': 'off',
        'import-x/no-namespace': 'off',
        'import-x/no-nodejs-modules': 'off',
        'import-x/no-relative-packages': 'error',
        'import-x/no-rename-default': 'off',
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
    }
  ]);
}

function getJsdocsConfigs(): Linter.Config[] {
  return defineConfig([
    {
      ...jsdoc.configs['flat/recommended-typescript-error'],
      files: sourceFiles
    },
    {
      files: sourceFiles,
      plugins: {
        jsdoc
      },
      rules: {
        'jsdoc/check-tag-names': [
          'error',
          {
            definedTags: [
              'official',
              'remark',
              'typeParam',
              'unofficial'
            ]
          }
        ],
        'jsdoc/escape-inline-tags': [
          'error',
          {
            allowedInlineTags: [
              'codemirror',
              'lezer'
            ]
          }
        ],
        'jsdoc/require-jsdoc': [
          'error',
          {
            contexts: [
              {
                context: 'ExportNamedDeclaration > FunctionDeclaration'
              },
              {
                context: 'ExportDefaultDeclaration > FunctionDeclaration'
              },
              {
                context: 'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression'
              },
              {
                context: 'ExportDefaultDeclaration > ArrowFunctionExpression'
              },
              {
                context: 'ExportNamedDeclaration MethodDefinition:not([accessibility="private"])'
              },
              {
                context: 'ExportDefaultDeclaration MethodDefinition:not([accessibility="private"])'
              },
              {
                context: 'ExportNamedDeclaration > ClassDeclaration > ClassBody > PropertyDefinition:not([accessibility=\'private\'])'
              },
              {
                context: 'ExportDefaultDeclaration > ClassDeclaration > ClassBody > PropertyDefinition:not([accessibility=\'private\'])'
              },
              {
                context: 'ExportNamedDeclaration > ClassDeclaration > ClassBody > TSAbstractPropertyDefinition:not([accessibility=\'private\'])'
              },
              {
                context: 'ExportDefaultDeclaration > ClassDeclaration > ClassBody > TSAbstractPropertyDefinition:not([accessibility=\'private\'])'
              },
              {
                context: 'ExportNamedDeclaration > TSInterfaceDeclaration'
              },
              {
                context: 'ExportNamedDeclaration > TSTypeAliasDeclaration'
              },
              {
                context: 'ExportNamedDeclaration > TSEnumDeclaration'
              },
              {
                context: 'ExportNamedDeclaration > ClassDeclaration'
              },
              {
                context: 'ExportDefaultDeclaration > ClassDeclaration'
              }
            ],
            publicOnly: false,
            require: {
              ArrowFunctionExpression: false,
              ClassDeclaration: false,
              ClassExpression: false,
              FunctionDeclaration: false,
              MethodDefinition: false
            }
          }
        ],
        'jsdoc/require-throws-type': 'off',
        'jsdoc/tag-lines': [
          'error',
          'any',
          {
            startLines: 1
          }
        ]
      },
      settings: {
        jsdoc: {
          tagNamePreference: {
            template: 'typeParam'
          }
        }
      }
    }
  ]);
}

function getNodeCompatConfigs(): Linter.Config[] {
  return defineConfig([
    {
      files: sourceFiles,
      ignores: declarationFiles,
      plugins: {
        n: nodePlugin
      },
      rules: {
        'n/no-unsupported-features/es-builtins': [
          'error',
          {
            version: minimumNodeVersion
          }
        ],
        'n/no-unsupported-features/node-builtins': [
          'error',
          {
            version: minimumNodeVersion
          }
        ]
      }
    }
  ]);
}

function getNoRestrictedSyntaxRulesConfigs(): Linter.Config[] {
  return defineConfig([
    {
      files: sourceFiles,
      rules: {
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
            message: 'Do not use anonymous inline object types in function parameters. Define a named interface instead.',
            selector: ':function > Identifier TSTypeLiteral'
          },
          {
            message: 'Do not use anonymous inline object types in function return types. Define a named interface instead.',
            selector: ':function > TSTypeAnnotation TSTypeLiteral'
          },
          {
            message: 'Do not use anonymous inline object types in interface/method signatures. Define a named interface instead.',
            selector: 'TSMethodSignature TSTypeLiteral'
          },
          {
            message: 'Do not use anonymous inline object types as type arguments. Define a named interface instead.',
            selector: 'TSTypeParameterInstantiation TSTypeLiteral'
          },
          {
            message: 'Do not use anonymous inline object types in type annotations. Define a named interface instead.',
            selector: 'TSTypeAnnotation TSTypeLiteral'
          },
          {
            message: 'Do not use anonymous inline object types in type assertions. Define a named interface instead.',
            selector: 'TSAsExpression TSTypeLiteral'
          },
          {
            message: 'Avoid dynamic import(). Use static imports instead. Only use dynamic imports for lazy/conditional loading.',
            selector: 'ImportExpression'
          },
          {
            message: 'Do not use `declare` on class properties. Initialize the property or use a regular type annotation.',
            selector: 'PropertyDefinition[declare=true]'
          }
        ]
      }
    }
  ]);
}

function getObsidianTypingsConfigs(): Linter.Config[] {
  return defineConfig([
    {
      files: sourceFiles,
      plugins: {
        'obsidian-typings': obsidianTypingsPlugin
      },
      rules: {
        'obsidian-typings/augmentation-member-tags': 'error',
        'obsidian-typings/constructor-getter-placement': 'error',
        'obsidian-typings/file-extension': 'error',
        'obsidian-typings/import-extensions': 'error',
        'obsidian-typings/internals-interface-tags': 'error',
        'obsidian-typings/jsdoc-balanced-code-fences': 'error',
        'obsidian-typings/jsdoc-empty-line-before-tags': 'error',
        'obsidian-typings/no-declare-module-in-internals': 'error',
        'obsidian-typings/no-import-alias-in-declare-global': 'error',
        'obsidian-typings/no-inherit-doc-tag': 'error',
        'obsidian-typings/no-interface-tags-in-augmentations': 'error',
        'obsidian-typings/no-member-unofficial-in-internals': 'error',
        'obsidian-typings/no-todo-tag': 'error',
        'obsidian-typings/one-declaration-per-file': 'error',
        'obsidian-typings/require-export-empty-in-augmentations': 'error',
        'obsidian-typings/require-member-description': 'error',
        'obsidian-typings/require-optional-underscore-members': 'error',
        'obsidian-typings/require-var-in-global-vars': 'error',
        'obsidian-typings/visibility-tags-last': 'error',
        'obsidian-typings/window-member-file-sync': 'error'
      }
    }
  ]);
}

function getOverrideConfigs(): Linter.Config[] {
  return defineConfig([
    {
      files: sourceFiles,
      rules: {
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ]);
}

function getPerfectionistConfigs(): Linter.Config[] {
  return defineConfig([
    {
      files: sourceFiles,
      plugins: {
        perfectionist
      },
      rules: {
        'perfectionist/sort-classes': ['error', {
          groups: [
            'property',
            'constructor',
            'method'
          ],
          newlinesBetween: 1,
          newlinesInside: 1,
          order: 'asc',
          type: 'alphabetical'
        }],
        'perfectionist/sort-exports': 'error',
        'perfectionist/sort-imports': 'error',
        'perfectionist/sort-interfaces': ['error', {
          groups: ['property', 'method'],
          order: 'asc',
          type: 'alphabetical'
        }],
        'perfectionist/sort-intersection-types': 'error',
        'perfectionist/sort-named-exports': ['error', {
          order: 'asc',
          type: 'alphabetical'
        }],
        'perfectionist/sort-named-imports': ['error', {
          order: 'asc',
          type: 'alphabetical'
        }],
        'perfectionist/sort-union-types': 'error'
      }
    }
  ]);
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
      files: sourceFiles,
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

function getTsdocsConfigs(): Linter.Config[] {
  return defineConfig([
    {
      files: sourceFiles,
      plugins: {
        tsdoc: eslintPluginTsdoc
      }
    }
  ]);
}

function getTseslintConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [tseslint.configs.recommended],
      files: sourceFiles,
      rules: {
        '@typescript-eslint/method-signature-style': ['error', 'method']
      }
    }
  ]);
}
