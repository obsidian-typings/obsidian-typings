/**
 * Scenario 3: With @codemirror — obsidian + @codemirror/* + obsidian-typings installed.
 * Verifies type unification: Editor.cm returns the real @codemirror/view EditorView,
 * dispatch interop works, and augmented members are accessible.
 */

import 'obsidian-typings';
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

// === Augmented members accessible on Editor.cm ===
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

// Suppress unused
void _cm;
void _activeCm;
void _eef;
