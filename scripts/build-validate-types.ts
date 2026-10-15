import {
  CliTaskResult,
  wrapCliTask
} from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import { getRootFolder } from '@mnaoumov/typescript-dev-toolkit/root';
import { join } from 'node:path/posix';

import {
  checkProjectTypes,
  parseTsConfig,
  toCanonical
} from './helpers/check-project-types.ts';

const DECLARATION_FILE_EXTENSIONS = ['.d.ts', '.d.cts', '.d.mts'];

await wrapCliTask(main);

function isDeclarationFile(fileName: string): boolean {
  return DECLARATION_FILE_EXTENSIONS.some((extension) => fileName.endsWith(extension));
}

function main(): CliTaskResult {
  const root = getRootFolder();

  if (!root) {
    throw new Error('Could not find root folder');
  }

  const { fileNames, options } = parseTsConfig(join(root, 'tsconfig.json'));
  const declarationFileNames = fileNames.filter((fileName) => isDeclarationFile(fileName));
  const declarationFileSet = new Set(declarationFileNames.map((fileName) => toCanonical(fileName)));

  const isOk = checkProjectTypes({
    options,
    rootNames: declarationFileNames,
    shouldKeepFile: (fileName) => declarationFileSet.has(fileName)
  });

  return CliTaskResult.Success(isOk);
}
