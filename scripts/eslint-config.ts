import { includeIgnoreFile } from '@eslint/compat';
import type { Linter } from 'eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import { resolve } from 'node:path';
import tseslint from 'typescript-eslint';

import { obsidianTypingsPlugin } from './helpers/eslint-plugin-obsidian-typings/index.ts';

const gitignorePath = resolve(import.meta.dirname, '..', '.gitignore');

export const config: Linter.Config[] = [
  {
    files: ['**/*.d.ts', '**/*.ts']
  },
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      'scripts/**',
      'workflow-scripts/**'
    ]
  },
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
    files: ['src/**/*.d.ts', 'src/**/*.ts'],
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
      'obsidian-typings/no-declare-module-in-internals': 'error',
      'obsidian-typings/no-interface-tags-in-augmentations': 'error',
      'obsidian-typings/no-member-unofficial-in-internals': 'error',
      'obsidian-typings/one-export-per-file': 'error',
      'obsidian-typings/window-member-file-sync': 'error'
    }
  },
  {
    files: ['src/**/*.d.ts', 'src/**/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'no-var': 'off'
    }
  }
];
