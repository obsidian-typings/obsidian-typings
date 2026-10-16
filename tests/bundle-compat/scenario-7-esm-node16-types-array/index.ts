/**
 * Scenario 7: ESM consumer on `module: node16` + `"type": "module"` that loads the typings through the
 * `types` array rather than through an import.
 *
 * This is the setup the README recommends first, and the one most consumers use. Unlike scenarios 5
 * and 6, nothing here imports `obsidian-typings`: the `types` entry in `tsconfig.json` is the only thing
 * that loads it, and on `node16` that entry resolves under the `require` condition to the `dist/cjs`
 * copy even in an ES-module package. So an augmentation has to be written against that copy, which is
 * what `plugins-record.d.cts` does. See its header for what happens to the same augmentation in an
 * ES-module file.
 */

// === A `PluginsPluginsRecord` augmentation must reach `App.plugins` ===
// `plugins-record.d.cts` adds `bundle-compat-probe`. If that augmentation merges into a copy of the
// bundle this program never loaded, the read below falls back to the index signature's plain `Plugin`
// and fails with `TS2339` on `probeValue`.
import type { App } from 'obsidian';
declare const app: App;
const _probeValue: number = app.plugins.plugins['bundle-compat-probe'].probeValue;
void _probeValue;
