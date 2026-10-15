import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';

import { checkout } from './helpers/checkout.ts';

async function main(): Promise<void> {
  const [, , targetBranch, withScriptsFlag] = process.argv;
  const shouldRestoreScripts = withScriptsFlag === '--with-scripts';
  if (!targetBranch) {
    throw new Error('Usage: jiti ./workflow-scripts/checkout.ts <targetBranch> [--with-scripts]');
  }

  await checkout(targetBranch, shouldRestoreScripts);
}

await wrapCliTask(main);
