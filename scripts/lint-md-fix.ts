import process from 'node:process';

import { lint } from './helpers/markdownlint.ts';

const [, , ...paths] = process.argv;

await lint({ paths, shouldFix: true });
