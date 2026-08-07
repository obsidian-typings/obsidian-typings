import type { EditorPosition } from 'obsidian';

import type { Bookmark } from '../Bookmark.d.ts';

/**
 * The visual selection as it was when visual mode was last left, which `gv` restores.
 *
 * The bookmarks track the document as it changes, so the selection can still be restored after edits;
 * the positions are where the selection was when it was saved.
 *
 * @public
 * @unofficial
 */
export interface VimLastSelection {
  /**
   * The position of the fixed end of the selection.
   */
  anchor: EditorPosition;

  /**
   * The bookmark tracking the fixed end of the selection.
   */
  anchorMark: Bookmark;

  /**
   * The position of the moving end of the selection.
   */
  head: EditorPosition;

  /**
   * The bookmark tracking the moving end of the selection.
   */
  headMark: Bookmark;

  /**
   * Whether the selection was made in visual block mode.
   */
  visualBlock: boolean;

  /**
   * Whether the selection was made in visual line mode.
   */
  visualLine: boolean;

  /**
   * Whether visual mode was active when the selection was saved.
   */
  visualMode: boolean;
}
