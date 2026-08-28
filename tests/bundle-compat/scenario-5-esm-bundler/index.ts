/**
 * Scenario 5: ESM consumer on `module: esnext` + `moduleResolution: bundler` — the Obsidian sample
 * plugin's own defaults, and the exact configuration reported in discussion #143.
 *
 * This is the scenario that resolves `obsidian-typings` through the `import` condition, reaching
 * `dist/esm/types.d.mts` and `dist/esm/implementations.d.mts`. Scenarios 1-4 are all `node16` CJS and
 * so only ever exercise the `require` condition, which is why the ESM entry points could ship as
 * re-export shims into the CJS bundle for months without a single gate noticing.
 *
 * The shim was not merely redundant, it was wrong: a declaration file has exactly one
 * `impliedNodeFormat`, so `dist/cjs/types.d.cts` stayed CommonJS no matter what `resolution-mode` the
 * shim asked for, and every `declare module "@codemirror/…"` block inside it attached to
 * `@codemirror/view/dist/index.d.cts` — while this file holds `index.d.ts`. The assignments below are
 * what breaks: they fail with `TS2719` ("Two different types with this name exist, but they are
 * unrelated") between two `EditorView` types that print as the *same* path.
 *
 * The `void editor.cm.viewState` / `.measure()` / `.cm` lines guard the opposite failure. Pinning the
 * bundle's bare specifiers with `resolution-mode` instead of copying the file silences `TS2719` but
 * drops every augmentation on the floor, because a `declare module` block cannot carry an import
 * attribute. That turns a loud error into silent type loss, so the augmented members are asserted to
 * still exist rather than merely to unify.
 */

import type {
  Compartment,
  Extension,
  StateField
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

// === editorEditorField: StateField<EditorView> ===
import { editorEditorField } from 'obsidian';
const _eef: StateField<EditorView> = editorEditorField;

// === Workspace.iterateCodeMirrors callback ===
declare const workspace: Workspace;
workspace.iterateCodeMirrors((cm: EditorView) => {
  cm.dispatch({ effects: compartment.reconfigure(extension) });
});

// === The `implementations` entry point is a second, separate defect ===
// `dist/esm/implementations.d.mts` shimmed to `dist/cjs/implementations.cjs`, so the `Editor` that
// `dts-bundle-generator` inlined into that bundle carried the CJS `EditorView` too — surfacing as
// `TS2345: Argument of type 'EditorView' is not assignable to parameter of type 'EditorView'`. Nothing
// under `src/obsidian/implementations/` imports `@codemirror` directly, so the unification is asserted
// through the augmented `Editor` the bundle inlines.
import { getEditorConstructor } from 'obsidian-typings/implementations';
declare const implEditor: InstanceType<ReturnType<typeof getEditorConstructor>>;
const _implCm: EditorView = implEditor.cm;

// Suppress unused
void _cm;
void _activeCm;
void _eef;
void _implCm;
