import type { EditorPosition } from 'obsidian';

/**
 * A selection range with anchor and head positions for CodeMirror editor.
 *
 * @public
 * @unofficial
 */
export interface CodeMirrorEditorSelectionRange {
  /** The anchor position of the selection. */
  anchor: EditorPosition;
  /** The head position of the selection. */
  head: EditorPosition;
}
