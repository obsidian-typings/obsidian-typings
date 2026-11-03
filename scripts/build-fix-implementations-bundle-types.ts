import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import {
  readFile,
  writeFile
} from 'node:fs/promises';

import { fixBundleTypes } from './helpers/fix-bundle-types.ts';

await wrapCliTask(async () => {
  const bundleTypesFilePath = 'dist/cjs/implementations.d.cts';
  await fixBundleTypes(bundleTypesFilePath);

  // Copy the single registry's source rather than all globals: inlining every global duplicates
  // index signatures when consumers load both entry points. Keep one authored registry definition.
  const content = await readFile(bundleTypesFilePath, 'utf-8');
  const registry = await readFile('src/globals/augmentations/ObsidianPixiTypes.d.ts', 'utf-8');
  await writeFile(bundleTypesFilePath, `${content}\n${registry}`, 'utf-8');
});
