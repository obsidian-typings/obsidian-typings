/**
 * Local ESLint plugin for project-specific rules.
 */
import type { ESLint } from 'eslint';

import { noUsedUnderscoreParams } from './no-used-underscore-params.ts';

export const localPlugin: ESLint.Plugin = {
  rules: {
    'no-used-underscore-params': noUsedUnderscoreParams
  }
};
