/**
 * Scenario 6: ESM consumer on `module: node16` + `"type": "module"` — the other way to reach the
 * `import` condition.
 *
 * Scenario 5 covers `moduleResolution: bundler`, which most plugin authors get from the Obsidian
 * sample plugin. This one holds the same `node16` resolver every other scenario uses and flips only
 * the package format, so a regression that is specific to one resolver rather than to the export
 * condition cannot hide. The two together are the full ESM surface: scenarios 1-4 are all CJS and
 * resolve `obsidian-typings` through `require`, so before these existed nothing exercised
 * `dist/esm/*.d.mts` at all.
 *
 * The assertions mirror scenario 5 deliberately — see its header for why each one is here.
 */

import type {
  Compartment,
  Extension
} from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import type {
  Editor,
  Plugin,
  Workspace
} from 'obsidian';

import 'obsidian-typings';

// === Editor.cm must be assignable to @codemirror/view's EditorView ===
declare const editor: Editor;
const _cm: EditorView = editor.cm;
const _activeCm: EditorView | null = editor.activeCM;

// === dispatch interop (the core pain point) ===
declare const compartment: Compartment;
declare const extension: Extension;
editor.cm.dispatch({
  effects: compartment.reconfigure(extension)
});

// === Augmented members must still be present, not silently dropped ===
void editor.cm.viewState;
void editor.cm.measure();
void editor.cm.cm;

// === Plugin.registerEditorExtension accepts real Extension ===
declare const plugin: Plugin;
plugin.registerEditorExtension(extension);

// === `editorEditorField` is deliberately NOT asserted here — see below ===
// Scenarios 3-5 assert `const _eef: StateField<EditorView> = editorEditorField`. This scenario cannot,
// and the reason is upstream rather than ours: the `obsidian` package ships a bare `obsidian.d.ts`
// with `"main": ""`, no `exports` map and no `"type": "module"`, so under `moduleResolution: node16`
// it is CommonJS-implied. Its own `import { StateField } from '@codemirror/state'` therefore resolves
// under the `require` condition to `index.d.cts`, while this ESM package holds `index.d.ts`. Every
// member `obsidian.d.ts` itself types with a `@codemirror` type is affected the same way, in any
// node16 ESM consumer, with or without `obsidian-typings` installed. Asserting it here would pin a
// permanently-red gate to a defect we do not own and cannot fix from this repo. Scenario 5 keeps the
// assertion because `moduleResolution: bundler` always uses the `import` condition and never applies
// an implied CommonJS format to a `.d.ts`.

// === Workspace.iterateCodeMirrors callback ===
declare const workspace: Workspace;
workspace.iterateCodeMirrors((cm: EditorView) => {
  cm.dispatch({ effects: compartment.reconfigure(extension) });
});

// === The `implementations` entry point is a second, separate defect ===
import { getEditorConstructor } from 'obsidian-typings/implementations';
declare const implEditor: InstanceType<ReturnType<typeof getEditorConstructor>>;
const _implCm: EditorView = implEditor.cm;

// Suppress unused
void _cm;
void _activeCm;
void _implCm;
