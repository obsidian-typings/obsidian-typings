import type { Linter } from 'eslint';

import { obsidianDevUtilsConfigs } from 'obsidian-dev-utils/ScriptUtils/ESLint/eslint.config';

const configs: Linter.Config[] = [
  ...obsidianDevUtilsConfigs,
  {
    files: ['*.ts'],
    rules: {
      'import-x/no-nodejs-modules': 'off',
      'no-console': 'off'
    }
  }
];

// eslint-disable-next-line import-x/no-default-export
export default configs;
