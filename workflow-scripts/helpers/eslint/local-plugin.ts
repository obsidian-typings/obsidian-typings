/**
 * Local ESLint plugin for project-specific rules.
 */
import type { ESLint } from 'eslint';

import { noUsedUnderscoreVariables } from './no-used-underscore-variables.ts';
import { readonlyParamsOptionsResultMembers } from './readonly-params-options-result-members.ts';

export const localPlugin: ESLint.Plugin = {
  rules: {
    'no-used-underscore-variables': noUsedUnderscoreVariables,
    'readonly-params-options-result-members': readonlyParamsOptionsResultMembers
  }
};
