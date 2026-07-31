import process from 'node:process';

import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import {
  execFromRoot,
  getRootFolder
} from './helpers/root.ts';

exitIfScriptDisabled();

async function main(): Promise<void> {
  const [, , ...paths] = process.argv;
  await spellcheck(paths);
}

async function spellcheck(paths: string[] = []): Promise<void> {
  if (paths.length === 0) {
    paths = ['.'];
  }

  const rootFolder = getRootFolder();

  await execFromRoot([
    'npx',
    'cspell',
    '--no-progress',
    '--no-must-find-files',
    /*
     * A path git ignores is a path cspell skips - generated output, build folders and every `node_modules`
     * are covered without a hand-maintained `ignorePaths` list that drifts from `.gitignore`.
     * `--gitignore-root` stops the search at the project root, so a `.gitignore` in some parent folder
     * outside the project cannot silently remove files from the check.
     */
    '--gitignore',
    ...(rootFolder === null ? [] : ['--gitignore-root', rootFolder]),
    { batchedArgs: paths }
  ]);
}

await main();
