import type { SearchQuery } from '@codemirror/search';
import type { EditorPosition } from 'obsidian';
import type { AddOverlayOptions } from './AddOverlayOptions.d.ts';
import type { Bookmark } from './Bookmark.d.ts';
import type { Bracket } from './Bracket.d.ts';
import type { CodeMirrorEditorMode } from './CodeMirrorEditorMode.d.ts';
import type { CodeMirrorEditorSearchCursor } from './CodeMirrorEditorSearchCursor.d.ts';
import type { Coords } from './Coords.d.ts';
import type { EditorSelection } from './EditorSelection.d.ts';
import type { HardWrapOptions } from './HardWrapOptions.d.ts';
import type { LineHandle } from './LineHandle.d.ts';
import type { LineHandleChange } from './LineHandleChange.d.ts';
import type { MatchingBracket } from './MatchingBracket.d.ts';
import type { OpenDialogOptions } from './OpenDialogOptions.d.ts';
import type { OpenNotificationOptions } from './OpenNotificationOptions.d.ts';
import type { ScrollInfo } from './ScrollInfo.d.ts';
import type { SetBookmarkOptions } from './SetBookmarkOptions.d.ts';
import type { SetSelectionOptions } from './SetSelectionOptions.d.ts';

/**
 * CM5-compatible editor interface wrapping a CodeMirror 6 editor view.
 * @public
 * @unofficial
 */
export interface CodeMirrorEditor {
  /** Pending line handle changes to be processed. */
  $lineHandleChanges: LineHandleChange[] | undefined;

  /**
   * Add a search overlay to highlight matches in the editor.
   *
   * @param options - The overlay options containing the search pattern.
   * @returns The search query, or `undefined` if the overlay could not be added.
   */
  addOverlay(options: AddOverlayOptions): SearchQuery | undefined;

  /** Remove focus from the editor. */
  blur(): void;

  /**
   * Get the pixel coordinates of a character position.
   *
   * @param pos - The editor position to get coordinates for.
   * @param mode - The coordinate system to use.
   * @returns The pixel coordinates of the position.
   */
  charCoords(pos: EditorPosition, mode: 'local' | 'page' | 'window' | 'div'): Coords;

  /**
   * Clip a position to be within the document bounds.
   *
   * @param pos - The editor position to clip.
   * @returns The clipped position within document bounds.
   */
  clipPos(pos: EditorPosition): EditorPosition;

  /**
   * Get the editor position corresponding to pixel coordinates.
   *
   * @param coords - The pixel coordinates to convert.
   * @param mode - The coordinate system of the input coordinates.
   * @returns The editor position at the given coordinates.
   */
  coordsChar(coords: Coords, mode: 'local' | 'page' | 'window' | 'div'): EditorPosition;

  /**
   * Get the default height of a line of text in pixels.
   *
   * @returns The default text height in pixels.
   */
  defaultTextHeight(): number;

  /** Destroy and clean up resources. */
  destroy(): void;

  /**
   * Execute a named editor command.
   *
   * @param command - The name of the command to execute.
   */
  execCommand(command: string): void;

  /**
   * Find the matching bracket for the bracket at the given position.
   *
   * @param pos - The position of the bracket to match.
   * @returns The matching bracket result.
   */
  findMatchingBracket(pos: EditorPosition): MatchingBracket;

  /**
   * Find a position vertically relative to the given start position.
   *
   * @param start - The starting editor position.
   * @param amount - The number of units to move.
   * @param unit - The unit of movement.
   * @param goalColumn - The desired column to maintain.
   * @returns The resulting editor position.
   */
  findPosV(start: EditorPosition, amount: number, unit: 'line' | 'page', goalColumn: number): EditorPosition;

  /**
   * Get the line number of the first line in the document.
   *
   * @returns The first line number.
   */
  firstLine(): number;

  /** Focus the editor. */
  focus(): void;

  /**
   * Fold the code block at the given line.
   *
   * @param line - The line number to fold at.
   */
  foldCode(line: number): void;

  /**
   * Execute a function for each selection in a multi-selection.
   *
   * @param fn - The function to execute for each selection.
   */
  forEachSelection(fn: () => void): void;

  /**
   * Get the cursor position, optionally specifying which end of the selection.
   *
   * @param type - Which end of the selection to return.
   * @returns The cursor position.
   */
  getCursor(type?: 'head' | 'anchor' | 'start' | 'end'): EditorPosition;

  /**
   * Get the editor's input field element.
   *
   * @returns The input field HTML element.
   */
  getInputField(): HTMLElement;

  /**
   * Get the position of the last edit.
   *
   * @returns The position of the last edit.
   */
  getLastEditEnd(): EditorPosition;

  /**
   * Get the text content of the given line number.
   *
   * @param line - The line number to get text for.
   * @returns The text content of the line.
   */
  getLine(line: number): string;

  /**
   * Get a handle for the given line number.
   *
   * @param line - The line number to get a handle for.
   * @returns The line handle.
   */
  getLineHandle(line: number): LineHandle;

  /**
   * Get the line number from a line handle, or `null` if the handle is invalid.
   *
   * @param handle - The line handle to get the number for.
   * @returns The line number, or `null` if the handle is invalid.
   */
  getLineNumber(handle: LineHandle): number | null;

  /**
   * Get the primary selection as anchor and head positions.
   *
   * @returns The primary editor selection.
   */
  getMainSelection(): EditorSelection;

  /**
   * Get the current editor language mode.
   *
   * @returns The editor language mode.
   */
  getMode(): CodeMirrorEditorMode;

  /**
   * Get the value of an editor option.
   *
   * @param option - The name of the option to get.
   * @returns The option value.
   */
  getOption(option: string): unknown;

  /**
   * Get the text between two positions.
   *
   * @param from - The start position.
   * @param to - The end position.
   * @returns The text between the two positions.
   */
  getRange(from: EditorPosition, to: EditorPosition): string;

  /**
   * Get information about the editor's scroll position and dimensions.
   *
   * @returns The scroll information.
   */
  getScrollInfo(): ScrollInfo;

  /**
   * Get a search cursor for the given regular expression starting at the given position.
   *
   * @param query - The regular expression to search for.
   * @param pos - The position to start searching from.
   * @returns The search cursor.
   */
  getSearchCursor(query: RegExp, pos: EditorPosition): CodeMirrorEditorSearchCursor;

  /**
   * Get the currently selected text.
   *
   * @returns The selected text.
   */
  getSelection(): string;

  /**
   * Get all selections as an array of strings.
   *
   * @returns An array of selected text strings.
   */
  getSelections(): string[];

  /**
   * Get the token type at the given position.
   *
   * @param pos - The position to get the token type for.
   * @returns The token type string.
   */
  getTokenTypeAt(pos: EditorPosition): string;

  /**
   * Get the full text content of the document.
   *
   * @returns The full document text.
   */
  getValue(): string;

  /**
   * Get the outermost wrapper element of the editor.
   *
   * @returns The wrapper HTML element.
   */
  getWrapperElement(): HTMLElement;

  /**
   * Hard-wrap text according to the given options.
   *
   * @param options - The hard wrap options.
   */
  hardWrap(options: HardWrapOptions): void;

  /** Decrease the indentation of the selection. */
  indentLess(): void;

  /**
   * Indent the given line, optionally adding more indentation.
   *
   * @param line - The line number to indent.
   * @param more - Whether to add more indentation.
   */
  indentLine(line: number, more?: boolean): void;

  /** Increase the indentation of the selection. */
  indentMore(): void;

  /**
   * Convert an editor position to a character index within the document.
   *
   * @param pos - The editor position to convert.
   * @returns The character index.
   */
  indexFromPos(pos: EditorPosition): number;

  /**
   * Check whether the editor is in multi-selection mode.
   *
   * @returns Whether the editor is in multi-selection mode.
   */
  isInMultiSelectMode(): boolean;

  /**
   * Get the line number of the last line in the document.
   *
   * @returns The last line number.
   */
  lastLine(): number;

  /**
   * Get the total number of lines in the document.
   *
   * @returns The total number of lines.
   */
  lineCount(): number;

  /**
   * Get all current selections as an array of anchor/head pairs.
   *
   * @returns An array of selections with anchor and head positions.
   */
  listSelections(): Array<{
    anchor: EditorPosition;
    head: EditorPosition;
  }>;

  /**
   * Move a position by character in the given direction.
   *
   * @param pos - The starting position.
   * @param dir - The direction to move.
   * @param unit - The number of characters to move.
   * @returns The resulting editor position.
   */
  moveByChar(pos: EditorPosition, dir: 'left' | 'right', unit: number): EditorPosition;

  /**
   * Move the cursor horizontally by the given number of units.
   *
   * @param dir - The direction and amount to move.
   * @param unit - The unit of movement.
   */
  moveH(dir: number, unit: string): void;

  /**
   * Remove an event listener from the editor.
   *
   * @param event - The event name.
   * @param listener - The event listener to remove.
   */
  off(event: string, listener: EventListenerOrEventListenerObject): void;

  /**
   * Add an event listener to the editor.
   *
   * @param event - The event name.
   * @param listener - The event listener to add.
   */
  on(event: string, listener: EventListenerOrEventListenerObject): void;

  /** Handle pre-operation-end cleanup. */
  onBeforeEndOperation(): void;

  /**
   * Handle a line handle change event.
   *
   * @param lineHandleChange - The line handle change to process.
   */
  onChange(lineHandleChange: LineHandleChange): void;

  /** Handle a selection change event. */
  onSelectionChange(): void;

  /**
   * Open an interactive dialog in the editor.
   *
   * @param template - The HTML template for the dialog.
   * @param keyValidator - The function to validate key input.
   * @param options - The dialog options.
   */
  openDialog(
    template: string,
    keyValidator: (keyValue: string) => boolean,
    options?: Partial<OpenDialogOptions>
  ): void;

  /**
   * Open a notification message in the editor. Returns a function to dismiss it.
   *
   * @param message - The notification message to display.
   * @param options - The notification options.
   * @returns A function to dismiss the notification.
   */
  openNotification(message: string, options?: OpenNotificationOptions): () => void;

  /**
   * Execute a function as a single operation, batching view updates.
   *
   * @typeParam T - The return type of the function.
   * @param fn - The function to execute.
   * @returns The return value of the function.
   */
  operation<T>(fn: () => T): T;

  /**
   * Overwrite the current selection with the given text.
   *
   * @param text - The text to overwrite the selection with.
   */
  overWriteSelection(text: string): void;

  /**
   * Convert a character index to an editor position.
   *
   * @param index - The character index to convert.
   * @returns The editor position.
   */
  posFromIndex(index: number): EditorPosition;

  /** Refresh the editor display. */
  refresh(): void;

  /** Release all tracked line handles. */
  releaseLineHandles(): void;

  /**
   * Remove a search overlay from the editor.
   *
   * @param overlay - The search query overlay to remove.
   */
  removeOverlay(overlay?: SearchQuery): void;

  /**
   * Replace the text in the given range.
   *
   * @param text - The replacement text.
   * @param from - The start position of the range.
   * @param to - The end position of the range.
   */
  replaceRange(text: string, from: EditorPosition, to?: EditorPosition): void;

  /**
   * Replace the current selection with the given text.
   *
   * @param text - The replacement text.
   */
  replaceSelection(text: string): void;

  /**
   * Replace all selections with the corresponding texts.
   *
   * @param texts - The replacement texts for each selection.
   */
  replaceSelections(texts: string[]): void;

  /**
   * Scan for a bracket from the given position in the specified direction.
   *
   * @param from - The position to start scanning from.
   * @param direction - The direction to scan (positive for forward, negative for backward).
   * @param style - The style filter for brackets.
   * @returns The found bracket, or `null` if none was found.
   */
  scanForBracket(from: EditorPosition, direction: number, style?: string): Bracket | null;

  /**
   * Get information about the editor's scroll position and dimensions.
   *
   * @returns The scroll information.
   */
  scrollInfo(): ScrollInfo;

  /**
   * Scroll the given position into view with an optional margin.
   *
   * @param pos - The position to scroll into view.
   * @param margin - The margin in pixels around the position.
   */
  scrollIntoView(pos?: EditorPosition, margin?: number): void;

  /**
   * Scroll the editor to the given coordinates.
   *
   * @param x - The horizontal scroll position.
   * @param y - The vertical scroll position.
   */
  scrollTo(x?: number, y?: number): void;

  /**
   * Set a bookmark at the given position.
   *
   * @param pos - The position to set the bookmark at.
   * @param options - The bookmark options.
   * @returns The created bookmark.
   */
  setBookmark(pos: EditorPosition, options?: SetBookmarkOptions): Bookmark;

  /**
   * Set the cursor position to the given line and character.
   *
   * @param line - The line number.
   * @param ch - The character offset.
   */
  setCursor(line: number, ch: number): void;

  /**
   * Set the value of an editor option.
   *
   * @param option - The name of the option to set.
   * @param value - The value to set.
   */
  setOption(option: string, value: unknown): void;

  /**
   * Set the selection to the given anchor and head positions.
   *
   * @param anchor - The anchor position of the selection.
   * @param head - The head position of the selection.
   * @param options - The selection options.
   */
  setSelection(anchor: EditorPosition, head: EditorPosition, options?: SetSelectionOptions): void;

  /**
   * Set multiple selections, optionally specifying the primary selection index.
   *
   * @param selections - The selections to set.
   * @param primaryIndex - The index of the primary selection.
   */
  setSelections(selections: EditorSelection[], primaryIndex?: number): void;

  /**
   * Set the size of the editor in pixels.
   *
   * @param width - The width in pixels.
   * @param height - The height in pixels.
   */
  setSize(width: number, height: number): void;

  /**
   * Set the full text content of the document.
   *
   * @param content - The text content to set.
   */
  setValue(content: string): void;

  /**
   * Emit a signal/event on the editor.
   *
   * @param event - The event name to emit.
   * @param args - Additional arguments to pass to the event handlers.
   */
  signal(event: string, ...args: unknown[]): void;

  /**
   * Check whether there is an active selection.
   *
   * @returns Whether there is an active selection.
   */
  somethingSelected(): boolean;

  /**
   * Toggle overwrite mode on or off.
   *
   * @param overwrite - Whether to enable overwrite mode.
   */
  toggleOverwrite(overwrite: boolean): void;

  /**
   * Check whether the editor is in virtual selection mode.
   *
   * @returns Whether the editor is in virtual selection mode.
   */
  virtualSelectionMode(): boolean;
}
