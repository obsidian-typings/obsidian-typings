import { join } from 'node:path/posix';
import process from 'node:process';

import {
  checkProjectTypes,
  parseTsConfig,
  toCanonical
} from './helpers/check-project-types.ts';
import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { getRootFolder } from './helpers/root.ts';

exitIfScriptDisabled();

const DECLARATION_FILE_EXTENSIONS = ['.d.ts', '.d.cts', '.d.mts'];

main();

function main(): void {
  const root = getRootFolder();

  if (!root) {
    throw new Error('Could not find root folder');
  }

  const { fileNames, options } = parseTsConfig(join(root, 'tsconfig.json'));
  const declarationFileNames = fileNames.filter(isDeclarationFile);
  const declarationFileSet = new Set(declarationFileNames.map(toCanonical));

  const isOk = checkProjectTypes({
    options,
    rootNames: declarationFileNames,
    shouldKeepFile: (fileName) => declarationFileSet.has(fileName)
  });

  if (!isOk) {
    process.exitCode = 1;
  }
}

function isDeclarationFile(fileName: string): boolean {
  return DECLARATION_FILE_EXTENSIONS.some((extension) => fileName.endsWith(extension));
}
