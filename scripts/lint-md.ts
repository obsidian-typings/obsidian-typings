import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import process from 'node:process';

import { lintMd } from './helpers/lint-md.ts';

await wrapCliTask(async () => {
  const [, , ...paths] = process.argv;

  await lintMd({ paths });
});
