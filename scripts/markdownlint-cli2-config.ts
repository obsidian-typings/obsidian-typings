import relativeLinksRule from 'markdownlint-rule-relative-links';

import type { MarkdownlintCli2ConfigurationSchema } from './helpers/@types/markdownlint-cli2-config-schema.d.ts';

import { mdIgnores } from './helpers/md-ignores.ts';

/* eslint-disable camelcase -- The property names are the same as the ones in the schema. */

export const config: MarkdownlintCli2ConfigurationSchema = {
  config: {
    'MD013': false,
    'MD024': {
      siblings_only: true
    },
    'MD052': {
      ignored_labels: [
        '!important',
        '!note',
        '!tip',
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
  ignores: mdIgnores
};

/* eslint-enable camelcase -- The property names are the same as the ones in the schema. */
