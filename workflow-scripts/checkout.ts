import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';

import { checkout } from './modules/checkout.ts';

await wrapCliTask(async () => {
  // eslint-disable-next-line no-magic-numbers
  const targetBranch = process.argv[2];
  // eslint-disable-next-line no-magic-numbers
  const withScripts = process.argv[3] === '--with-scripts';
  if (!targetBranch) {
    throw new Error('Usage: bun ./workflow-scripts/checkout.ts <targetBranch> [--with-scripts]');
  }

  await checkout(targetBranch, withScripts);
});
