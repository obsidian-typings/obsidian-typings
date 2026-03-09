import type { EditorPosition } from 'obsidian';

/**
 * Represents a selection in the editor with anchor and head positions.
 * @public
 * @unofficial
 */
export interface EditorSelection {
  /** The fixed end of the selection (where selection started). */
  anchor: EditorPosition;

  /** The moving end of the selection (where the cursor is). */
  head: EditorPosition;
}
