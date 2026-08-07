/**
 * A keystroke recorded while insert mode was active, so the insertion can be replayed by `.` or by a
 * macro.
 *
 * @public
 * @unofficial
 */
export interface VimInsertModeKey {
  /**
   * Whether the Alt modifier was held.
   */
  altKey: boolean;

  /**
   * Whether the Control modifier was held.
   */
  ctrlKey: boolean;

  /**
   * The `key` value of the originating keyboard event.
   */
  key: string;

  /**
   * The Vim-style name of the key, such as `<C-a>`.
   */
  keyName: string;

  /**
   * Whether the Meta modifier was held.
   */
  metaKey: boolean;

  /**
   * Whether the Shift modifier was held.
   */
  shiftKey: boolean;
}
