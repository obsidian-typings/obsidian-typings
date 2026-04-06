import type { ESLint } from 'eslint';

import { noUsedUnderscoreVariables } from './no-used-underscore-variables.ts';

export const customEslintPlugin: ESLint.Plugin = {
  rules: {
    'no-used-underscore-variables': noUsedUnderscoreVariables
  }
};
