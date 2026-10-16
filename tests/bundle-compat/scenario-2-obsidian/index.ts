/**
 * Scenario 2: With obsidian — obsidian + obsidian-typings installed.
 * obsidian's peerDependencies (@codemirror/*) are NOT installed.
 * Verifies obsidian augmentations compile without type conflicts.
 */

import 'obsidian-typings';
import type {
  Editor,
  Plugin,
  Workspace
} from 'obsidian';

// Augmented obsidian types are accessible
declare const editor: Editor;
void editor.cm;
void editor.containerEl;
void editor.activeCM;

// Obsidian-typings augmentations on official types
declare const plugin: Plugin;
void plugin;

declare const workspace: Workspace;
void workspace;

// === A `PluginsPluginsRecord` augmentation must reach `App.plugins` ===
// `plugins-record.d.ts` adds `bundle-compat-probe`. If that augmentation merges into a copy of the bundle
// this program never loaded, the read below falls back to the index signature's plain `Plugin` and fails
// with `TS2339` on `probeValue`.
import type { App } from 'obsidian';
declare const app: App;
const _probeValue: number = app.plugins.plugins['bundle-compat-probe'].probeValue;
void _probeValue;
