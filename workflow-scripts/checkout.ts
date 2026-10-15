import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';

import { checkout } from './helpers/checkout.ts';

async function main(): Promise<void> {
  const [, , targetBranch, withScriptsFlag] = process.argv;
  const withScripts = withScriptsFlag === '--with-scripts';
  if (!targetBranch) {
    throw new Error('Usage: jiti ./workflow-scripts/checkout.ts <targetBranch> [--with-scripts]');
  }

  await checkout(targetBranch, withScripts);
}

await wrapCliTask(main);
