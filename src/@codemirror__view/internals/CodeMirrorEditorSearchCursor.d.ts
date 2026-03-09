import type { EditorPosition } from 'obsidian';

/**
 * A cursor for iterating over search matches in the editor document.
 * @public
 * @unofficial
 */
export interface CodeMirrorEditorSearchCursor {
  /**
   * Find the next or previous match. Returns true if a match was found.
   *
   * @param reverse - Whether to search in reverse direction.
   * @returns Whether a match was found.
   */
  find(reverse?: boolean): boolean;

  /**
   * Find the next match. Returns true if a match was found.
   *
   * @returns Whether a match was found.
   */
  findNext(): boolean;

  /**
   * Find the previous match. Returns true if a match was found.
   *
   * @returns Whether a match was found.
   */
  findPrevious(): boolean;

  /**
   * Get the start position of the current match, or void if no match.
   *
   * @returns The start position of the current match.
   */
  from(): EditorPosition | void;

  /**
   * Replace the current match with the given text.
   *
   * @param text - The replacement text.
   */
  replace(text: string): void;

  /**
   * Get the end position of the current match, or void if no match.
   *
   * @returns The end position of the current match.
   */
  to(): EditorPosition | void;
}
