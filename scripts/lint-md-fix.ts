import process from 'node:process';

import { lintMd } from './helpers/lint-md.ts';

const [, , ...paths] = process.argv;

await lintMd({ paths, shouldFix: true });
