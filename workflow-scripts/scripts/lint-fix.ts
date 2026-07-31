import process from 'node:process';

import { exitIfScriptDisabled } from '../helpers/env-toggle.ts';
import { execFromRoot } from '../helpers/exec.ts';

exitIfScriptDisabled();

const [, , ...paths] = process.argv;

if (paths.length === 0) {
  paths.push('.');
}

await execFromRoot(['eslint', '--fix', ...paths]);
