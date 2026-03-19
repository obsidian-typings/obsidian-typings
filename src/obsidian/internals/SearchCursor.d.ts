import type { EditorRange } from 'obsidian';

/**
 * Cursor for navigating through search results in the editor.
 *
 * @public
 * @unofficial
 */
export interface SearchCursor {
  /**
   * Current editor search position.
   *
   * @returns The current search position range.
   */
  current(): EditorRange;

  /**
   * All search results.
   *
   * @returns Array of all matching ranges.
   */
  findAll(): EditorRange[];

  /**
   * Next editor search position.
   *
   * @returns The next search position range.
   */
  findNext(): EditorRange;

  /**
   * Previous editor search position.
   *
   * @returns The previous search position range.
   */
  findPrevious(): EditorRange;

  /**
   * Replace current search result with specified text.
   *
   * @param replacement - The text to replace with.
   * @param origin - The origin identifier for the change.
   * @remark origin is used by CodeMirror to determine which component was responsible for the change.
   */
  replace(replacement: string, origin: string): void;

  /**
   * Replace all search results with specified text.
   *
   * @param replacement - The text to replace with.
   * @param origin - The origin identifier for the change.
   */
  replaceAll(replacement: string, origin: string): void;
}
