import relativeLinksRule from 'markdownlint-rule-relative-links';

import type { MarkdownlintCli2ConfigurationSchema } from './helpers/@types/markdownlint-cli2-config-schema.d.ts';

import { MD_IGNORES } from './helpers/md-ignores.ts';

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
  /*
   * Every `.gitignore` in the tree, and up to the repository root - git's own default behavior. A path git
   * ignores is a path we do not lint, so `node_modules` (including the nested ones under test fixtures),
   * `dist`, and every generated folder are skipped without anyone maintaining a list that can drift.
   */
  gitignore: true,
  globs: [
    '**/*.md'
  ],
  ignores: MD_IGNORES
};

/* eslint-enable camelcase -- The property names are the same as the ones in the schema. */
