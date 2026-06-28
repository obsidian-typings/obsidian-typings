import process from 'node:process';

import { execFromRoot } from './helpers/root.ts';

async function main(): Promise<void> {
  const [, , ...paths] = process.argv;
  await spellcheck(paths);
}

async function spellcheck(paths: string[] = []): Promise<void> {
  if (paths.length === 0) {
    paths = ['.'];
  }

  await execFromRoot(['npx', 'cspell', '--no-progress', '--no-must-find-files', { batchedArgs: paths }]);
}

await main();
