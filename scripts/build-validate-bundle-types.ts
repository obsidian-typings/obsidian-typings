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
  let isOk = true;

  for (const bundleFile of BUNDLE_FILES) {
    const bundlePath = join(root, bundleFile);
    const bundleCanonical = toCanonical(bundlePath);
    console.log(`Validating ${bundleFile}...`);

    const isBundleOk = checkProjectTypes({
      options,
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
