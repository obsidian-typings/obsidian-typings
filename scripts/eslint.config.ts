import type { Linter } from 'eslint';

import perfectionist from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';

import { obsidianTypingsPlugin } from './helpers/eslint-plugin-obsidian-typings/index.ts';

export const eslintConfig: Linter.Config[] = [
    {
        files: ['**/*.d.ts', '**/*.ts']
    },
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            'scripts/**',
            'workflow-scripts/**',
            // Generated during compilation (also in .gitignore).
            // The file-extension rule enforces .ts in implementations/ for source files;
            // .gitignore prevents generated .d.ts files from being committed.
            'src/obsidian/implementations/**/*.d.ts'
        ]
    },
    // TypeScript parser (no type-checking — fast)
    ...tseslint.configs.recommended.map((config) => {
        const { files: _files, ...rest } = config;
        return rest;
    }),
    // Perfectionist sorting rules
    {
        plugins: {
            perfectionist: perfectionist
        },
        rules: {
            // Sort interface members alphabetically.
            // No groups — perfectionist classifies getters as methods, but they should be with properties.
            'perfectionist/sort-interfaces': ['error', {
                order: 'asc',
                type: 'alphabetical'
            }],
            // Sort class members: properties first, then methods
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
            // Sort named imports/exports alphabetically
            'perfectionist/sort-named-exports': ['error', {
                order: 'asc',
                type: 'alphabetical'
            }],
            'perfectionist/sort-named-imports': ['error', {
                order: 'asc',
                type: 'alphabetical'
            }],
            // Import/export statement sorting handled by dprint
            'perfectionist/sort-exports': 'off',
            'perfectionist/sort-imports': 'off',
            // Union/intersection type sorting disabled — `null` last is idiomatic
            'perfectionist/sort-intersection-types': 'off',
            'perfectionist/sort-union-types': 'off'
        }
    },
    // Custom obsidian-typings rules (src/ only)
    {
        files: ['src/**/*.d.ts', 'src/**/*.ts'],
        plugins: {
            'obsidian-typings': obsidianTypingsPlugin
        },
        rules: {
            'obsidian-typings/augmentation-member-tags': 'error',
            'obsidian-typings/file-extension': 'error',
            'obsidian-typings/import-extensions': 'error',
            'obsidian-typings/internals-interface-tags': 'error',
            'obsidian-typings/no-declare-module-in-internals': 'error',
            'obsidian-typings/no-interface-tags-in-augmentations': 'error',
            'obsidian-typings/no-member-unofficial-in-internals': 'error',
            'obsidian-typings/one-export-per-file': 'error'
        }
    },
    // Disable rules that don't apply to declaration files (src/ only)
    {
        files: ['src/**/*.d.ts', 'src/**/*.ts'],
        rules: {
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-wrapper-object-types': 'off',
            '@typescript-eslint/triple-slash-reference': 'off',
            'no-var': 'off'
        }
    }
];
