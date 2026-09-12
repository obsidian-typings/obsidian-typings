import process from 'node:process';

import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { resolveToolCommand } from './helpers/package-manager.ts';
import { execFromRoot } from './helpers/root.ts';

exitIfScriptDisabled();

const [, , ...paths] = process.argv;

if (paths.length === 0) {
  paths.push('.');
}

await execFromRoot([...resolveToolCommand({ tool: 'eslint' }), '--fix', { batchedArguments: paths }]);
