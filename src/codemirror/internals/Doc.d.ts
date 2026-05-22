import type { DocHistorySize } from './DocHistorySize.d.ts';
import type { Position } from './Position.d.ts';
import type { TextMarker } from './TextMarker.d.ts';

/**
 * A CodeMirror 5 document instance.
 *
 * @public
 * @unofficial
 */
export interface Doc {
  /**
   * Clears the editor's undo history.
   */
  clearHistory(): void;

  /**
   * Get the first line of the editor.
   *
   * @returns The number of the first line (usually `0`).
   */
  firstLine(): number;

  /**
   * Gets the cursor position.
   *
   * @param start - Optional string indicating which end of the selection to return.
   * @returns The cursor position.
   */
  getCursor(start?: string): Position;

  /**
   * Gets the content of the given line.
   *
   * @param n - The line number.
   * @returns The content of the line.
   */
  getLine(n: number): string;

  /**
   * Gets the text between the given points.
   *
   * @param from - The start position.
   * @param to - The end position.
   * @param separator - Optional line separator.
   * @returns The text between the positions.
   */
  getRange(from: Position, to: Position, separator?: string): string;

  /**
   * Gets the currently selected text.
   *
   * @param lineSep - Optional line separator.
   * @returns The selected text.
   */
  getSelection(lineSep?: string): string;

  /**
   * Gets the editor content.
   *
   * @param separator - Optional line separator.
   * @returns The editor content.
   */
  getValue(separator?: string): string;

  /**
   * Gets the number of undo/redo operations available.
   *
   * @returns An object with `undo` and `redo` counts.
   */
  historySize(): DocHistorySize;

  /**
   * Get the last line of the editor.
   *
   * @returns The number of the last line.
   */
  lastLine(): number;

  /**
   * Gets the number of lines in the document.
   *
   * @returns The line count.
   */
  lineCount(): number;

  /**
   * Marks a range of text with a specific CSS class.
   *
   * @param from - The start position.
   * @param to - The end position.
   * @param options - Optional marker options.
   * @returns The created text marker.
   */
  markText(from: Position, to: Position, options?: object): TextMarker;

  /**
   * Redoes the last undone edit.
   */
  redo(): void;

  /**
   * Replaces the range between the given points with the given string.
   *
   * @param replacement - The replacement text.
   * @param from - The start position.
   * @param to - The optional end position.
   * @param origin - Optional origin string.
   */
  replaceRange(replacement: string, from: Position, to?: Position, origin?: string): void;

  /**
   * Replaces the current selection with the given string.
   *
   * @param replacement - The replacement text.
   * @param select - Optional selection behavior after replacement.
   */
  replaceSelection(replacement: string, select?: 'around' | 'start'): void;

  /**
   * Inserts a bookmark at the given position.
   *
   * @param pos - The position of the bookmark.
   * @param options - Optional bookmark options.
   * @returns The created text marker.
   */
  setBookmark(pos: Position, options?: object): TextMarker;

  /**
   * Sets the cursor position.
   *
   * @param pos - The position or line number.
   * @param ch - Optional character position.
   * @param options - Optional cursor options.
   */
  setCursor(pos: number | Position, ch?: number, options?: object): void;

  /**
   * Sets the selection range.
   *
   * @param anchor - The anchor position.
   * @param head - The optional head position.
   * @param options - Optional selection options.
   */
  setSelection(anchor: Position, head?: Position, options?: object): void;

  /**
   * Sets the editor content.
   *
   * @param content - The new content.
   */
  setValue(content: string): void;

  /**
   * Tells whether the editor currently has a selection.
   *
   * @returns `true` if text is selected.
   */
  somethingSelected(): boolean;

  /**
   * Undoes the last edit.
   */
  undo(): void;
}
