/**
 * Scenario 1: Standalone — only obsidian-typings installed.
 * Verifies the package is self-contained and usable without any other dependencies.
 * Internal-only types are accessible as direct exports.
 * @codemirror types are available from their module paths via declare module blocks.
 */

import 'obsidian-typings';
import type {
  EditorViewState,
  VimEditor
} from 'obsidian-typings';

// Internal-only types are directly exported
declare const viewState: EditorViewState;
declare const vim: VimEditor;

// Suppress unused
void viewState;
void vim;
