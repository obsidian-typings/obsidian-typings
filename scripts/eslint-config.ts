import type { Linter } from 'eslint';

import { includeIgnoreFile } from '@eslint/compat';
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { flatConfigs as eslintPluginImportXFlatConfigs } from 'eslint-plugin-import-x';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig } from 'eslint/config';
import { resolve } from 'node:path';
import tseslint from 'typescript-eslint';

const gitignorePath = resolve(import.meta.dirname, '..', '.gitignore');

const typeScriptFiles = [
  'src/**/*.ts',
  'src/**/*.d.ts',
  'scripts/**/*.ts'
];

export const config: Linter.Config[] = defineConfig([
  {
    files: typeScriptFiles
  },
  includeIgnoreFile(gitignorePath),
  ...tseslint.configs.recommended.map((config) => {
    const rest = { ...config };
    delete (rest as Record<string, unknown>)['files'];
    return rest;
  }),
  {
    plugins: {
      perfectionist: perfectionist
    },
    rules: {
      'perfectionist/sort-interfaces': ['error', {
        groups: ['property', 'method'],
        order: 'asc',
        type: 'alphabetical'
      }],
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
      'perfectionist/sort-named-exports': ['error', {
        order: 'asc',
        type: 'alphabetical'
      }],
      'perfectionist/sort-named-imports': ['error', {
        order: 'asc',
        type: 'alphabetical'
      }],
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-intersection-types': 'error',
      'perfectionist/sort-union-types': 'error'
    }
  },
  {
    files: typeScriptFiles,
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  ...defineConfig({
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
  }),
  ...defineConfig([
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
      files: ['scripts/**/*.ts'],
      rules: {
        'import-x/no-nodejs-modules': 'off'
      }
    }
  ]),
  ...defineConfig([
    {
      settings: {
        'import-x/resolver-next': [
          createTypeScriptImportResolver({
            alwaysTryTypes: true
          })
        ]
      }
    }
  ])
]);
