import { checkout } from './helpers/checkout.ts';
import { exitIfScriptDisabled } from './helpers/env-toggle.ts';

exitIfScriptDisabled();

async function main(): Promise<void> {
  const [, , targetBranch, withScriptsFlag] = process.argv;
  const withScripts = withScriptsFlag === '--with-scripts';
  if (!targetBranch) {
    throw new Error('Usage: jiti ./workflow-scripts/checkout.ts <targetBranch> [--with-scripts]');
  }

  await checkout(targetBranch, withScripts);
}

await main();
