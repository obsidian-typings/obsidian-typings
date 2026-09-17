/**
 * @file
 *
 * ESLint plugin for Obsidian development utilities.
 */
import type { ESLint } from 'eslint';

import { noUsedUnderscoreVariables } from './no-used-underscore-variables.ts';
import { readonlyParamsOptionsResultMembers } from './readonly-params-options-result-members.ts';

export const obsidianDevUtilsPlugin: ESLint.Plugin = {
  rules: {
    'no-used-underscore-variables': noUsedUnderscoreVariables,
    'readonly-params-options-result-members': readonlyParamsOptionsResultMembers
  }
};
