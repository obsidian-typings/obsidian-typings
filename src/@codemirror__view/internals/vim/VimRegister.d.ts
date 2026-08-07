import type { VimInsertModeChanges } from './VimInsertModeChanges.d.ts';

/**
 * One Vim register, holding yanked or deleted text along with how it should be pasted back.
 *
 * @public
 * @unofficial
 */
export interface VimRegister {
  /**
   * Whether the register's text is pasted as a rectangular block.
   */
  blockwise: boolean;

  /**
   * The insert-mode sessions recorded into this register, for macro playback.
   */
  insertModeChanges: VimInsertModeChanges[];

  /**
   * The register's text, stored as the pieces it was built from.
   */
  keyBuffer: string[];

  /**
   * Whether the register's text is pasted on its own lines rather than inline.
   */
  linewise: boolean;

  /**
   * The search queries recorded into this register, for macro playback.
   */
  searchQueries: string[];

  /**
   * Discard everything the register holds.
   */
  clear(): void;

  /**
   * Append a recorded insert-mode session to the register.
   *
   * @param changes - The insert-mode session to append.
   */
  pushInsertModeChanges(changes: VimInsertModeChanges): void;

  /**
   * Append a recorded search query to the register.
   *
   * @param query - The search query to append.
   */
  pushSearchQuery(query: string): void;

  /**
   * Append text to the register, keeping what is already there.
   *
   * @param text - The text to append.
   * @param linewise - Whether the appended text is linewise.
   */
  pushText(text: string, linewise?: boolean): void;

  /**
   * Replace everything the register holds with the given text.
   *
   * @param text - The text to store.
   * @param linewise - Whether the text is linewise.
   * @param blockwise - Whether the text is blockwise.
   */
  setText(text?: string, linewise?: boolean, blockwise?: boolean): void;

  /**
   * Get the register's text as a single string.
   *
   * @returns The register's text.
   */
  toString(): string;
}
