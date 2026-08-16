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

const BUNDLE_FILES = [
  'dist/cjs/types.d.cts',
  'dist/cjs/implementations.d.cts'
];

main();

function main(): void {
  const root = getRootFolder();

  if (!root) {
    throw new Error('Could not find root folder');
  }

  const { options } = parseTsConfig(join(root, 'tsconfig.json'));

  // The repo's own `tsconfig.json` sets `types: ['@total-typescript/ts-reset', 'node']`, which puts
  // the Node types in scope for free and hides whatever the bundle uses without declaring it. A
  // consumer compiling with `types: []` gets no such help: everything the bundle needs must arrive
  // through the bundle itself (a `/// <reference types="..." />` directive or an import). Validating
  // with an empty `types` list is what makes the bundle prove it is self-contained — it is how the
  // missing `/// <reference types="node" />` went unnoticed until a consumer hit 40 errors.
  const consumerOptions = {
    ...options,
    types: []
  };
  let isOk = true;

  for (const bundleFile of BUNDLE_FILES) {
    const bundlePath = join(root, bundleFile);
    const bundleCanonical = toCanonical(bundlePath);
    console.log(`Validating ${bundleFile}...`);

    const isBundleOk = checkProjectTypes({
      options: consumerOptions,
      rootNames: [bundlePath],
      shouldKeepFile: (fileName) => fileName === bundleCanonical
    });

    if (!isBundleOk) {
      isOk = false;
    }
  }

  if (!isOk) {
    process.exitCode = 1;
  }
}
