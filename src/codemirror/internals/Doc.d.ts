import type { Cm5BookmarkOptions } from './Cm5BookmarkOptions.d.ts';
import type { Cm5Editor } from './Cm5Editor.d.ts';
import type { Cm5LineHandle } from './Cm5LineHandle.d.ts';
import type { Cm5LineWidget } from './Cm5LineWidget.d.ts';
import type { Cm5LineWidgetOptions } from './Cm5LineWidgetOptions.d.ts';
import type { Cm5LinkedDocOptions } from './Cm5LinkedDocOptions.d.ts';
import type { Cm5Mode } from './Cm5Mode.d.ts';
import type { Cm5ModeSpec } from './Cm5ModeSpec.d.ts';
import type { Cm5Range } from './Cm5Range.d.ts';
import type { Cm5SelectionOptions } from './Cm5SelectionOptions.d.ts';
import type { Cm5SelectionRange } from './Cm5SelectionRange.d.ts';
import type { Cm5TextMarkerOptions } from './Cm5TextMarkerOptions.d.ts';
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
  /** The mode specification for this document. */
  modeOption: Cm5ModeSpec<unknown> | string;

  /**
   * Adds a line widget below the given line.
   *
   * @param line - The line number or handle.
   * @param node - The DOM node to display.
   * @param options - Optional widget configuration.
   * @returns The created line widget.
   */
  addLineWidget(line: Cm5LineHandle | number, node: HTMLElement, options?: Cm5LineWidgetOptions): Cm5LineWidget;

  /**
   * Adds a new selection to the existing set of selections.
   *
   * @param anchor - The anchor position.
   * @param head - The optional head position.
   */
  addSelection(anchor: Position, head?: Position): void;

  /**
   * Returns a number that can later be passed to isClean to test whether any edits were made.
   *
   * @param closeEvent - Whether to close the current history event.
   * @returns The generation number.
   */
  changeGeneration(closeEvent?: boolean): number;

  /**
   * Clears the editor's undo history.
   */
  clearHistory(): void;

  /**
   * Create an identical copy of this document.
   *
   * @param copyHistory - Whether to copy the history.
   * @returns The new document.
   */
  copy(copyHistory: boolean): Doc;

  /**
   * Iterate over the whole document, calling f for each line.
   *
   * @param f - The function to call for each line.
   */
  eachLine(f: (line: Cm5LineHandle) => void): void;

  /**
   * Iterate over a range of lines.
   *
   * @param start - The start line number.
   * @param end - The end line number (exclusive).
   * @param f - The function to call for each line.
   */
  eachLine(start: number, end: number, f: (line: Cm5LineHandle) => void): void;

  /**
   * Moves the head of the selection while leaving the anchor in place.
   *
   * @param from - The position to extend from.
   * @param to - Optional end of region to select.
   * @param options - Optional selection options.
   */
  extendSelection(from: Position, to?: Position, options?: Cm5SelectionOptions): void;

  /**
   * Like extendSelection, but acts on all selections at once.
   *
   * @param heads - The new head positions.
   * @param options - Optional selection options.
   */
  extendSelections(heads: Position[], options?: Cm5SelectionOptions): void;

  /**
   * Applies a function to all selections and calls extendSelections on the result.
   *
   * @param f - The function to apply to each range.
   */
  extendSelectionsBy(f: (range: Cm5Range) => Position): void;

  /**
   * Returns an array of all the bookmarks and marked ranges found between the given positions.
   *
   * @param from - The start position.
   * @param to - The end position.
   * @returns An array of text markers.
   */
  findMarks(from: Position, to: Position): TextMarker[];

  /**
   * Returns an array of all the bookmarks and marked ranges at the given position.
   *
   * @param pos - The position.
   * @returns An array of text markers.
   */
  findMarksAt(pos: Position): TextMarker[];

  /**
   * Get the first line of the editor.
   *
   * @returns The number of the first line (usually `0`).
   */
  firstLine(): number;

  /**
   * Returns an array containing all marked ranges in the document.
   *
   * @returns An array of text markers.
   */
  getAllMarks(): TextMarker[];

  /**
   * Gets the cursor position.
   *
   * @param start - Optional string indicating which end of the selection to return.
   * @returns The cursor position.
   */
  getCursor(start?: string): Position;

  /**
   * Retrieve the editor associated with this document.
   *
   * @returns The editor, or `null`.
   */
  getEditor(): Cm5Editor | null;

  /** Get the value of the 'extending' flag. */
  getExtending(): boolean;

  /**
   * Get a JSON-serializable representation of the undo history.
   *
   * @returns The history object.
   */
  getHistory(): unknown;

  /**
   * Gets the content of the given line.
   *
   * @param n - The line number.
   * @returns The content of the line.
   */
  getLine(n: number): string;

  /**
   * Fetches the line handle for the given line number.
   *
   * @param num - The line number.
   * @returns The line handle.
   */
  getLineHandle(num: number): Cm5LineHandle;

  /**
   * Given a line handle, returns the current position of that line.
   *
   * @param handle - The line handle.
   * @returns The line number, or `null` if no longer in the document.
   */
  getLineNumber(handle: Cm5LineHandle): null | number;

  /**
   * Gets the mode object for this document.
   *
   * @returns The mode object.
   */
  getMode(): Cm5Mode<unknown>;

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
   * Returns an array containing a string for each selection.
   *
   * @param lineSep - Optional line separator.
   * @returns The selected texts.
   */
  getSelections(lineSep?: string): string[];

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
   * The reverse of posFromIndex.
   *
   * @param object - The position.
   * @returns The zero-based index.
   */
  indexFromPos(object: Position): number;

  /**
   * Returns whether the document is currently clean.
   *
   * @param generation - Optional generation value from changeGeneration.
   * @returns Whether the document is clean.
   */
  isClean(generation?: number): boolean;

  /**
   * Will call the given function for all documents linked to this document.
   *
   * @param fn - The function to call for each linked document.
   */
  iterLinkedDocs(fn: (doc: Doc, sharedHist: boolean) => void): void;

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
   * Returns the preferred line separator string for this document.
   *
   * @returns The line separator string.
   */
  lineSeparator(): string;

  /**
   * Create a new document linked to this one.
   *
   * @param options - Link options.
   * @returns The linked document.
   */
  linkedDoc(options: Cm5LinkedDocOptions): Doc;

  /** Set the editor content as 'clean'. */
  markClean(): void;

  /**
   * Marks a range of text with a specific CSS class.
   *
   * @param from - The start position.
   * @param to - The end position.
   * @param options - Optional marker options.
   * @returns The created text marker.
   */
  markText(from: Position, to: Position, options?: Cm5TextMarkerOptions): TextMarker;

  /**
   * Removes an event listener.
   *
   * @param eventName - The event name.
   * @param handler - The handler to remove.
   */
  off(eventName: string, handler: (...args: unknown[]) => void): void;

  /**
   * Registers an event listener.
   *
   * @param eventName - The event name.
   * @param handler - The handler to register.
   */
  on(eventName: string, handler: (...args: unknown[]) => void): void;

  /**
   * Calculates a position for a zero-based index.
   *
   * @param index - The zero-based index.
   * @returns The position.
   */
  posFromIndex(index: number): Position;

  /**
   * Redoes the last undone edit.
   */
  redo(): void;

  /** Redo one undone selection change. */
  redoSelection(): void;

  /**
   * Remove the given line from the document.
   *
   * @param n - The line number.
   */
  removeLine(n: number): void;

  /**
   * Removes a line widget.
   *
   * @param widget - The widget to remove.
   */
  removeLineWidget(widget: Cm5LineWidget): void;

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
   * Replaces the content of the selections.
   *
   * @param replacements - The replacement strings.
   * @param collapse - How to collapse selections after replacement.
   * @param origin - Optional origin string.
   */
  replaceSelections(replacements: string[], collapse?: null | string, origin?: null | string): void;

  /**
   * Inserts a bookmark at the given position.
   *
   * @param pos - The position of the bookmark.
   * @param options - Optional bookmark options.
   * @returns The created text marker.
   */
  setBookmark(pos: Position, options?: Cm5BookmarkOptions): TextMarker;

  /**
   * Sets the cursor position.
   *
   * @param pos - The position or line number.
   * @param ch - Optional character position.
   * @param options - Optional cursor options.
   */
  setCursor(pos: number | Position, ch?: number, options?: Cm5SelectionOptions): void;

  /**
   * Sets or clears the 'extending' flag.
   *
   * @param value - Whether to enable extending.
   */
  setExtending(value: boolean): void;

  /**
   * Replace the editor's undo history.
   *
   * @param history - The history object.
   */
  setHistory(history: unknown): void;

  /**
   * Set the content of a given line.
   *
   * @param n - The line number.
   * @param text - The new text.
   */
  setLine(n: number, text: string): void;

  /**
   * Sets the selection range.
   *
   * @param anchor - The anchor position.
   * @param head - The optional head position.
   * @param options - Optional selection options.
   */
  setSelection(anchor: Position, head?: Position, options?: Cm5SelectionOptions): void;

  /**
   * Sets a new set of selections.
   *
   * @param ranges - The selection ranges.
   * @param primary - The index of the primary selection.
   * @param options - Optional selection options.
   */
  setSelections(ranges: Cm5SelectionRange[], primary?: number, options?: Cm5SelectionOptions): void;

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

  /** Undo one selection change. */
  undoSelection(): void;

  /**
   * Break the link between two documents.
   *
   * @param doc - The document to unlink.
   */
  unlinkDoc(doc: Doc): void;
}
