import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import {
  readFile,
  writeFile
} from 'node:fs/promises';

import { fixBundleTypes } from './helpers/fix-bundle-types.ts';

await wrapCliTask(async () => {
  const bundleTypesFilePath = 'dist/cjs/implementations.d.cts';
  await fixBundleTypes(bundleTypesFilePath);

  // Copy only the opt-in registries: inlining every global duplicates index signatures when
  // consumers load both entry points. Keep each registry in one authored source.
  const content = await readFile(bundleTypesFilePath, 'utf-8');
  const registry = await readFile('src/globals/augmentations/ObsidianPixiTypes.d.ts', 'utf-8');
  const electronRegistry = await readFile('src/globals/augmentations/ObsidianElectronTypes.d.ts', 'utf-8');
  const pdfJsRegistry = await readFile('src/globals/augmentations/ObsidianPdfJsTypes.d.ts', 'utf-8');
  const lezerRegistry = await readFile('src/globals/augmentations/ObsidianLezerTypes.d.ts', 'utf-8');
  await writeFile(bundleTypesFilePath, `${content}\n${registry}\n${electronRegistry}\n${pdfJsRegistry}\n${lezerRegistry}`, 'utf-8');
});
