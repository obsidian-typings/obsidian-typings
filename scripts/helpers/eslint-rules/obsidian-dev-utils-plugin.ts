/**
 * @file
 *
 * ESLint plugin for Obsidian development utilities.
 */
import type { ESLint } from 'eslint';

import { noUnusedParamsMembers } from './no-unused-params-members.ts';
import { noUsedUnderscoreVariables } from './no-used-underscore-variables.ts';
import { paramsOptionsNameMatch } from './params-options-name-match.ts';
import { readonlyParamsOptionsResultMembers } from './readonly-params-options-result-members.ts';

export const obsidianDevUtilsPlugin: ESLint.Plugin = {
  rules: {
    'no-unused-params-members': noUnusedParamsMembers,
    'no-used-underscore-variables': noUsedUnderscoreVariables,
    'params-options-name-match': paramsOptionsNameMatch,
    'readonly-params-options-result-members': readonlyParamsOptionsResultMembers
  }
};
