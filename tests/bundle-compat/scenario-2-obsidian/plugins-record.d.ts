/**
 * Augments `PluginsPluginsRecord`, the designed extension point for typing another plugin's instance.
 *
 * This package has no `"type"` field, so `.d.ts` here is CommonJS, the same format as the `dist/cjs` copy that `import 'obsidian-typings'` loads in `index.ts`.
 */

import type { Plugin } from 'obsidian';

declare module 'obsidian-typings' {
  interface PluginsPluginsRecord {
    'bundle-compat-probe': Plugin & { probeValue: number };
  }
}
