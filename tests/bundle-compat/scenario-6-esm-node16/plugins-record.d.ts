/**
 * Augments `PluginsPluginsRecord`, the designed extension point for typing another plugin's instance.
 *
 * This package is `"type": "module"`, so `.d.ts` here is an ES module and `declare module 'obsidian-typings'` resolves under the `import` condition to `dist/esm/types.d.mts`. That works only because `index.ts` loads the package with an ESM import, which puts that same copy in the program. A module augmentation never adds the file it targets to the program, so this file paired with a `types` entry instead (which `node16` resolves under `require`, to `dist/cjs`) would merge into nothing, and do so silently. Scenario 7 is that setup.
 */

import type { Plugin } from 'obsidian';

declare module 'obsidian-typings' {
  interface PluginsPluginsRecord {
    'bundle-compat-probe': Plugin & { probeValue: number };
  }
}
