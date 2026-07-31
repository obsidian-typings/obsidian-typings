import { checkout } from './helpers/checkout.ts';
import { exitIfScriptDisabled } from './helpers/env-toggle.ts';

exitIfScriptDisabled();

async function main(): Promise<void> {
  const targetBranch = process.argv[2];
  const withScripts = process.argv[3] === '--with-scripts';
  if (!targetBranch) {
    throw new Error('Usage: jiti ./workflow-scripts/checkout.ts <targetBranch> [--with-scripts]');
  }

  await checkout(targetBranch, withScripts);
}

await main();
