import relativeLinksRule from 'markdownlint-rule-relative-links';

import type { MarkdownlintCli2ConfigurationSchema } from './helpers/@types/markdownlint-cli2-config-schema.d.ts';

export const config: MarkdownlintCli2ConfigurationSchema = {
  config: {
    'MD013': false,
    'MD024': {
      siblings_only: true
    },
    'MD052': {
      ignored_labels: [
        '!note',
        '!warning'
      ],

      shortcut_syntax: true
    },
    'relative-links': true
  },
  customRules: [
    relativeLinksRule
  ],
  globs: [
    '**/*.md'
  ],
  ignores: [
    '.git/**',
    'dist/**',
    'docs/**',
    'node_modules/**',
    'workflow-scripts/**'
  ]
};
