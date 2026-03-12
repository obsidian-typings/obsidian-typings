import type { Glob } from '@cspell/cspell-types';

import {
  checkFilenameMatchesGlob,
  isBinaryFile,
  loadConfig
} from 'cspell-lib';

import { execFromRoot } from './helpers/exec.ts';

async function main() {
  const [, , ...paths] = process.argv;
  await spellcheck(paths);
}

export async function spellcheck(paths: string[] = []): Promise<void> {
  let filteredPaths = await filterPaths(paths);
  if (filteredPaths.length === 0) {
    if (paths.length === 0) {
      filteredPaths = ['.'];
    } else {
      return;
    }
  }
  await execFromRoot(['npx', 'cspell', ...filteredPaths, '--no-progress']);
}

async function filterPaths(paths: string[]): Promise<string[]> {
  const config = await loadConfig('cspell.json');
  const ignorePaths = config.ignorePaths ?? [];
  const globs = ignorePaths.map((p: Glob): string => typeof p === 'string' ? p : p.glob);

  return paths.filter((path) => !isBinaryFile(path) && !checkFilenameMatchesGlob(path, globs));
}

await main();
