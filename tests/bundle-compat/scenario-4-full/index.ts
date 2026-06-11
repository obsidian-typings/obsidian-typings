/**
 * Scenario 4: Full dependencies — all real packages installed.
 * Verifies no type conflicts when all vendored packages' real counterparts are present.
 */

// === @codemirror imports from real packages ===
import type {
  Compartment,
  EditorState,
  Extension,
  StateField,
  Transaction
} from '@codemirror/state';
import type {
  EditorView,
  ViewUpdate
} from '@codemirror/view';
import type {
  Editor,
  Plugin,
  Workspace
} from 'obsidian';

// Import obsidian-typings to activate augmentations
import type {} from 'obsidian-typings';

declare const realView: EditorView;

declare const editor: Editor;
const _cm: EditorView = editor.cm;
const _activeCm: EditorView | null = editor.activeCM;

declare const compartment: Compartment;
declare const extension: Extension;
editor.cm.dispatch({
  effects: compartment.reconfigure(extension)
});

void editor.cm.viewState;
void editor.cm.measure();
void editor.cm.cm;

declare const realField: StateField<boolean>;
void realField;

declare const plugin: Plugin;
plugin.registerEditorExtension(extension);

declare const realState: EditorState;
void realState;

declare const realTx: Transaction;
void realTx;

declare const realUpdate: ViewUpdate;
void realUpdate;

import { editorEditorField } from 'obsidian';
const _eef: StateField<EditorView> = editorEditorField;

declare const workspace: Workspace;
workspace.iterateCodeMirrors((cm: EditorView) => {
  cm.dispatch({ effects: compartment.reconfigure(extension) });
});

// === @codemirror/language unification ===
import type { Language } from '@codemirror/language';
declare const realLang: Language;
void realLang;

// === @lezer/common — augmentations should not conflict ===
import type { Tree } from '@lezer/common';
declare const realTree: Tree;
void realTree;

// === i18next — augmentations should not conflict ===
import type { i18n } from 'i18next';
declare const i18next: i18n;
void i18next;

// === moment (used by obsidian.d.ts) ===
import type * as Moment from 'moment';
declare const m: Moment.Moment;
void m;

// === No duplicate identifier errors ===
// The mere fact this file compiles proves no conflicts exist
// between vendored types and their real package counterparts.

// Suppress unused
void _cm;
void _activeCm;
void _eef;
