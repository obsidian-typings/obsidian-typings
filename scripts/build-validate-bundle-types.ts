import { readFile } from 'node:fs/promises';
import { join } from 'node:path/posix';
import process from 'node:process';

import {
  checkProjectTypes,
  parseTsConfig,
  toCanonical
} from './helpers/check-project-types.ts';
import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { ESM_BUNDLE_COPIES } from './helpers/esm-bundle-copies.ts';
import { getRootFolder } from './helpers/root.ts';

exitIfScriptDisabled();

// Both entry points of both bundles. The `.d.mts` copies are checked as root files of their own, not
// just written and trusted: the repo's `tsconfig.json` is `module: node16`, so a `.d.mts` root file
// gets `impliedNodeFormat: ESM` and resolves every bare specifier inside it under the `import`
// condition. That is the surface the ESM shims silently got wrong for months — nothing validated it,
// because only the two `dist/cjs` files were ever listed here.
const BUNDLE_FILES = ESM_BUNDLE_COPIES.flatMap((copy) => [copy.cjsPath, copy.esmPath]);

await main();

async function main(): Promise<void> {
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

  if (!await validateEsmCopies(root)) {
    isOk = false;
  }

  if (!isOk) {
    process.exitCode = 1;
  }
}

/**
 * Asserts every ESM entry point is still a byte-for-byte copy of its CJS counterpart rather than a
 * re-export shim.
 *
 * The type check above cannot catch this: a shim type-checks perfectly well on its own, and so does
 * every consumer that never touches an augmented `@codemirror` member. The defect only surfaces in a
 * consumer's own program, as a `TS2719` between two `EditorView` types that print as the same path —
 * or, worse, as augmented members silently going missing. Comparing bytes is what makes the
 * regression fail here instead of in someone's plugin. See `helpers/esm-bundle-copies.ts` for why a
 * shim cannot work.
 *
 * @param root - The repo root folder.
 * @returns `true` when every copy matches its source, `false` otherwise.
 */
async function validateEsmCopies(root: string): Promise<boolean> {
  let isOk = true;

  for (const copy of ESM_BUNDLE_COPIES) {
    console.log(`Validating ${copy.esmPath} is a byte-for-byte copy of ${copy.cjsPath}...`);
    const cjsContent = await readFile(join(root, copy.cjsPath));
    const esmContent = await readFile(join(root, copy.esmPath));

    if (cjsContent.equals(esmContent)) {
      continue;
    }

    console.error(
      `${copy.esmPath} (${String(esmContent.byteLength)} bytes) is not a byte-for-byte copy of ${copy.cjsPath} (${String(cjsContent.byteLength)} bytes). `
        + 'An ESM entry point must be a full copy, never a re-export shim — a shim keeps the CJS `impliedNodeFormat`, so every augmentation inside it '
        + 'attaches to the `.d.cts` copy of `@codemirror/*` that an ESM consumer never loads. Check `build:copy-esm-bundle-types`.'
    );
    isOk = false;
  }

  return isOk;
}
