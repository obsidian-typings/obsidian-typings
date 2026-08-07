import type { EditorPosition } from 'obsidian';

/**
 * The previous visual selection, replayed by operators that reuse it, such as the one behind `gv`.
 *
 * @public
 * @unofficial
 */
export interface VimLastSelectionRange {
  /**
   * The fixed end of the selection.
   */
  anchor: EditorPosition;

  /**
   * The moving end of the selection.
   */
  head: EditorPosition;

  /**
   * Whether the selection was made in visual block mode.
   */
  visualBlock: boolean;

  /**
   * Whether the selection was made in visual line mode.
   */
  visualLine: boolean;
}
