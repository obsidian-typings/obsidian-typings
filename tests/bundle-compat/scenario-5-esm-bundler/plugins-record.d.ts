/**
 * Augments `PluginsPluginsRecord`, the designed extension point for typing another plugin's instance.
 *
 * `moduleResolution: bundler` resolves every specifier under the `import` condition, so the augmentation and the import in `index.ts` both reach `dist/esm/types.d.mts`.
 */

import type { Plugin } from 'obsidian';

declare module 'obsidian-typings' {
  interface PluginsPluginsRecord {
    'bundle-compat-probe': Plugin & { probeValue: number };
  }
}
