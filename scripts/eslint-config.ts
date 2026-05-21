import type { Linter } from 'eslint';

import commentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs';
import { includeIgnoreFile } from '@eslint/config-helpers';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { flatConfigs as eslintPluginImportXFlatConfigs } from 'eslint-plugin-import-x';
// eslint-disable-next-line import-x/no-named-as-default -- The default export name `index` is too confusing.
import jsdoc from 'eslint-plugin-jsdoc';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginTsdoc from 'eslint-plugin-tsdoc';
import { defineConfig } from 'eslint/config';
import { resolve } from 'node:path';
import tseslint from 'typescript-eslint';

import { obsidianTypingsPlugin } from './helpers/eslint-plugin-obsidian-typings/index.ts';
import { customEslintPlugin } from './helpers/eslint-rules/custom-eslint-plugin.ts';

const gitignorePath = resolve(import.meta.dirname, '..', '.gitignore');

const sourceFiles = ['src/**/*.ts', 'src/**/*.d.ts'];
const scriptFiles = ['scripts/**/*.ts'];
const typeScriptFiles = [...sourceFiles, ...scriptFiles];

export const config: Linter.Config[] = defineConfig([
  {
    files: typeScriptFiles
  },
  includeIgnoreFile(gitignorePath),
  ...getEslintConfigs(),
  ...getTseslintConfigs(),
  ...getStylisticConfigs(),
  ...getImportXConfigs(),
  ...getPerfectionistConfigs(),
  ...getEslintImportResolverTypescriptConfigs(),
  ...getEslintCommentsConfigs(),
  ...getCustomPluginConfigs(),
  ...getNoRestrictedSyntaxRulesConfigs(),
  ...getObsidianTypingsConfigs(),
  ...getOverrideConfigs(),
  ...getJsdocsConfigs(),
  ...getTsdocsConfigs()
]);

function getCustomPluginConfigs(): Linter.Config[] {
  return defineConfig([
    {
      files: typeScriptFiles,
      plugins: {
        custom: customEslintPlugin
      },
      rules: {
        'custom/no-used-underscore-variables': 'error'
      }
    }
  ]);
}

function getEslintCommentsConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [commentsConfigs.recommended],
      files: typeScriptFiles,
      rules: {
        '@eslint-community/eslint-comments/require-description': 'error'
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

function getEslintConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [eslint.configs.recommended],
      files: typeScriptFiles,
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
    },
    {
      files: scriptFiles,
      rules: {
        'no-console': 'off'
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

function getImportXConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [
        eslintPluginImportXFlatConfigs.recommended as Linter.Config,
        eslintPluginImportXFlatConfigs.typescript as Linter.Config,
        eslintPluginImportXFlatConfigs.errors as Linter.Config,
        eslintPluginImportXFlatConfigs.warnings as Linter.Config
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
        'import-x/no-default-export': 'off',
        'import-x/no-deprecated': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/no-dynamic-require': 'error',
        'import-x/no-empty-named-blocks': 'error',
        'import-x/no-extraneous-dependencies': 'error',
        'import-x/no-import-module-exports': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-named-default': 'off',
        'import-x/no-named-as-default-member': 'off',
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
    },
    {
      files: scriptFiles,
      rules: {
        'import-x/no-nodejs-modules': 'off'
      }
    }
  ]);
}

function getNoRestrictedSyntaxRulesConfigs(): Linter.Config[] {
  return defineConfig([
    {
      files: typeScriptFiles,
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            message: 'Avoid dynamic import(). Use static imports instead. Only use dynamic imports for lazy/conditional loading (G10a).',
            selector: 'ImportExpression'
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
        'obsidian-typings/constructor-base-restricted': 'error',
        'obsidian-typings/constructor-getter-placement': 'error',
        'obsidian-typings/file-extension': 'error',
        'obsidian-typings/import-extensions': 'error',
        'obsidian-typings/internals-interface-tags': 'error',
        'obsidian-typings/jsdoc-empty-line-before-tags': 'error',
        'obsidian-typings/no-declare-module-in-internals': 'error',
        'obsidian-typings/no-inherit-doc-tag': 'error',
        'obsidian-typings/no-import-alias-in-declare-global': 'error',
        'obsidian-typings/no-interface-tags-in-augmentations': 'error',
        'obsidian-typings/no-member-unofficial-in-internals': 'error',
        'obsidian-typings/no-todo-tag': 'error',
        'obsidian-typings/one-export-per-file': 'error',
        'obsidian-typings/require-export-empty-in-augmentations': 'error',
        'obsidian-typings/require-member-description': 'error',
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
      files: typeScriptFiles,
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
    ...tseslint.configs.recommended.map((config) => {
      const rest = { ...config };
      delete (rest as Record<string, unknown>)['files'];
      return rest;
    }),
    {
      files: typeScriptFiles,
      rules: {
        '@typescript-eslint/method-signature-style': ['error', 'method']
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
        'jsdoc/escape-inline-tags': [
          'error',
          {
            allowedInlineTags: [
              'codemirror',
              'lezer'
            ]
          }
        ],
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
