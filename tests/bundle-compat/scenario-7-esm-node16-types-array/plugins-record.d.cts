/**
 * Augments `PluginsPluginsRecord` from a `.d.cts` file, which is the form that works when the package
 * is loaded through the `types` array.
 *
 * `node16` resolves a `types` entry under the `require` condition whatever the consumer's `"type"` is,
 * so `App.plugins` is typed from `dist/cjs/types.d.cts`. An augmentation has to target that copy, and
 * a `.d.cts` file is CommonJS in any package, so its `declare module 'obsidian-typings'` resolves to it.
 * The same block in a `.d.ts` or `.ts` file of this `"type": "module"` package would resolve to
 * `dist/esm/types.d.mts` instead. A module augmentation never adds the file it targets to the program,
 * so that copy is never loaded and the augmentation merges into nothing, without any error.
 */

import type { Plugin } from 'obsidian';

declare module 'obsidian-typings' {
  interface PluginsPluginsRecord {
    'bundle-compat-probe': Plugin & { probeValue: number };
  }
}
