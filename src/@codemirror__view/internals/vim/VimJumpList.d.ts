import type { EditorPosition } from 'obsidian';

import type { Bookmark } from '../Bookmark.d.ts';
import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';

/**
 * The ring buffer of positions jumped from, walked by `Ctrl-o` and `Ctrl-i`.
 *
 * @public
 * @unofficial
 */
export interface VimJumpList {
  /**
   * The position remembered for the `#` and `*` motions, which jump without disturbing the list.
   */
  cachedCursor: EditorPosition | undefined;

  /**
   * Record a jump from one position to another.
   *
   * @param cm - The editor the jump happened in.
   * @param oldCur - The position jumped from.
   * @param newCur - The position jumped to.
   */
  add(cm: CodeMirrorEditor, oldCur: EditorPosition, newCur: EditorPosition): void;

  /**
   * Look up the position the given number of steps away without moving the current position.
   *
   * @param cm - The editor to resolve the position in.
   * @param offset - How many steps to look, negative towards older entries.
   * @returns The position, or `null` or `undefined` when there is no entry that far away.
   */
  find(cm: CodeMirrorEditor, offset: number): EditorPosition | null | undefined;

  /**
   * Move the given number of steps through the list.
   *
   * @param cm - The editor to resolve the position in.
   * @param offset - How many steps to move, negative towards older entries.
   * @returns The bookmark now pointed at, or `undefined` when there is no entry that far away.
   */
  move(cm: CodeMirrorEditor, offset: number): Bookmark | undefined;
}
