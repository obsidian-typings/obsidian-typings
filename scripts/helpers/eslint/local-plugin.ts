/**
 * Local ESLint plugin for project-specific rules.
 */
import type { ESLint } from 'eslint';

import { noUnusedParamsMembers } from './no-unused-params-members.ts';
import { noUsedUnderscoreVariables } from './no-used-underscore-variables.ts';
import { readonlyParamsOptionsResultMembers } from './readonly-params-options-result-members.ts';

export const localPlugin: ESLint.Plugin = {
  rules: {
    'no-unused-params-members': noUnusedParamsMembers,
    'no-used-underscore-variables': noUsedUnderscoreVariables,
    'readonly-params-options-result-members': readonlyParamsOptionsResultMembers
  }
};
