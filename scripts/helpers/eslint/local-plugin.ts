/**
 * Local ESLint plugin for project-specific rules.
 */
import type { ESLint } from 'eslint';

import { noUnusedParamsMembers } from './no-unused-params-members.ts';
import { noUsedUnderscoreParams } from './no-used-underscore-params.ts';
import { readonlyParamsOptionsResultMembers } from './readonly-params-options-result-members.ts';

export const localPlugin: ESLint.Plugin = {
  rules: {
    'no-unused-params-members': noUnusedParamsMembers,
    'no-used-underscore-params': noUsedUnderscoreParams,
    'readonly-params-options-result-members': readonlyParamsOptionsResultMembers
  }
};
