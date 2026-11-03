import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import {
  cp,
  mkdir
} from 'node:fs/promises';
import { dirname } from 'node:path/posix';

import { ESM_BUNDLE_COPIES } from './helpers/esm-bundle-copies.ts';

await wrapCliTask(async () => {
  for (const copy of ESM_BUNDLE_COPIES) {
    await mkdir(dirname(copy.esmPath), { recursive: true });
    await cp(copy.cjsPath, copy.esmPath);
  }

  // Keep the optional upstream import outside the generated standalone indexes and bundles.
  await cp('integrations/pixi.d.ts', 'dist/cjs/pixi.d.cts');
  await cp('integrations/pixi.d.ts', 'dist/esm/pixi.d.mts');
});
