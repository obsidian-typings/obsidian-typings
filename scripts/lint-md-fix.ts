import process from 'node:process';

import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { lintMd } from './helpers/lint-md.ts';

exitIfScriptDisabled();

const [, , ...paths] = process.argv;

await lintMd({ paths, shouldFix: true });
