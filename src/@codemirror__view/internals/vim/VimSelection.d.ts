import type { EditorPosition } from 'obsidian';

/**
 * The selection Vim is maintaining, which differs from the editor's own selection because Vim's is
 * inclusive of the character under the cursor.
 *
 * @public
 * @unofficial
 */
export interface VimSelection {
  /**
   * The fixed end of the selection.
   */
  anchor: EditorPosition;

  /**
   * The moving end of the selection, where the cursor is.
   */
  head: EditorPosition;
}
