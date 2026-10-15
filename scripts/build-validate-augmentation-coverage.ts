import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path/posix';
import process from 'node:process';

import {
  getMissingAugmentations,
  getModuleExportNames
} from './helpers/augmentation-coverage.ts';
import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { getRootFolder } from './helpers/root.ts';

exitIfScriptDisabled();

await main();

async function main(): Promise<void> {
  const root = getRootFolder();

  if (!root) {
    throw new Error('Could not find root folder');
  }

  const obsidianDeclarationPath = join(root, 'node_modules/obsidian/obsidian.d.ts');
  const exportNames = getModuleExportNames(readFileSync(obsidianDeclarationPath, 'utf-8'));
  const augmentationFilePaths = await readdir(join(root, 'src/obsidian/augmentations'), { recursive: true });
  const missingNames = getMissingAugmentations({ augmentationFilePaths, exportNames });

  if (missingNames.length === 0) {
    console.log(`All ${String(exportNames.length)} exports of ${obsidianDeclarationPath} have an augmentation file.`);
    return;
  }

  console.error(`${String(missingNames.length)} export(s) of ${obsidianDeclarationPath} have no file under src/obsidian/augmentations/:`);
  for (const name of missingNames) {
    console.error(`  ${name}`);
  }
  process.exitCode = 1;
}
