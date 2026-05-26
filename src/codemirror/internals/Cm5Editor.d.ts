import type { Cm5CoordsMode } from './Cm5CoordsMode.d.ts';
import type { Cm5EditorCharCoords } from './Cm5EditorCharCoords.d.ts';
import type { Cm5EditorCoordsCharInput } from './Cm5EditorCoordsCharInput.d.ts';
import type { Cm5EditorCursorCoords } from './Cm5EditorCursorCoords.d.ts';
import type { Cm5EditorDisplay } from './Cm5EditorDisplay.d.ts';
import type { Cm5EditorScrollRect } from './Cm5EditorScrollRect.d.ts';
import type { Cm5EditorState } from './Cm5EditorState.d.ts';
import type { Cm5FindPosResult } from './Cm5FindPosResult.d.ts';
import type { Cm5KeyMap } from './Cm5KeyMap.d.ts';
import type { Cm5LineHandle } from './Cm5LineHandle.d.ts';
import type { Cm5LineInfo } from './Cm5LineInfo.d.ts';
import type { Cm5LineWidget } from './Cm5LineWidget.d.ts';
import type { Cm5LineWidgetOptions } from './Cm5LineWidgetOptions.d.ts';
import type { Cm5Mode } from './Cm5Mode.d.ts';
import type { Cm5OverlayOptions } from './Cm5OverlayOptions.d.ts';
import type { Cm5Range } from './Cm5Range.d.ts';
import type { Cm5ScrollInfo } from './Cm5ScrollInfo.d.ts';
import type { Cm5SelectionOptions } from './Cm5SelectionOptions.d.ts';
import type { Cm5SelectionRange } from './Cm5SelectionRange.d.ts';
import type { Cm5Token } from './Cm5Token.d.ts';
import type { Cm5Viewport } from './Cm5Viewport.d.ts';
import type { Doc } from './Doc.d.ts';
import type { Position } from './Position.d.ts';

/**
 * A CodeMirror 5 editor instance.
 *
 * @public
 * @unofficial
 */
export interface Cm5Editor extends Doc {
  /** The display object containing the wrapper element. */
  display: Cm5EditorDisplay;
  /** The editor state object. */
  state: Cm5EditorState;

  /**
   * Adds a key map to the editor.
   *
   * @param map - The key map to add.
   * @param bottom - Whether to add the map at the bottom of the stack.
   */
  addKeyMap(map: Cm5KeyMap | string, bottom?: boolean): void;

  /**
   * Set a CSS class name for the given line.
   *
   * @param line - The line number or handle.
   * @param where - Which element to apply the class to ("text", "background", or "wrap").
   * @param className - The CSS class name.
   * @returns The line handle.
   */
  addLineClass(line: Cm5LineHandle | number, where: string, className: string): Cm5LineHandle;

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
   * Adds a mode overlay to the editor.
   *
   * @param mode - The mode or mode name.
   * @param options - Optional overlay options.
   */
  addOverlay(mode: unknown, options?: Cm5OverlayOptions): void;

  /**
   * Adds a new selection to the existing set of selections.
   *
   * @param anchor - The anchor position.
   * @param head - The optional head position.
   */
  addSelection(anchor: Position, head?: Position): void;

  /**
   * Puts an absolutely positioned DOM node into the editor.
   *
   * @param pos - The position to place the widget at.
   * @param node - The DOM node.
   * @param scrollIntoView - Whether to scroll the widget into view.
   */
  addWidget(pos: Position, node: HTMLElement, scrollIntoView: boolean): void;

  /**
   * Returns the coordinates for a character position.
   *
   * @param pos - The character position.
   * @param mode - The coordinate system to use.
   * @returns An object with `left`, `right`, `top`, and `bottom` properties.
   */
  charCoords(pos: Position, mode?: Cm5CoordsMode): Cm5EditorCharCoords;

  /** Remove all gutter markers in the gutter with the given ID. */
  clearGutter(gutterID: string): void;

  /**
   * Returns the position corresponding to the given coordinates.
   *
   * @param coords - The coordinates with `left` and `top` properties.
   * @param mode - The coordinate system used.
   * @returns The corresponding position.
   */
  coordsChar(coords: Cm5EditorCoordsCharInput, mode?: Cm5CoordsMode): Position;

  /**
   * Returns the coordinates of the cursor.
   *
   * @param where - Whether to return the start or end of the selection.
   * @param mode - The coordinate system to use.
   * @returns An object with `left`, `top`, and `bottom` properties.
   */
  cursorCoords(where?: boolean | Position, mode?: Cm5CoordsMode): Cm5EditorCursorCoords;

  /**
   * Returns the default character width.
   *
   * @returns The default character width in pixels.
   */
  defaultCharWidth(): number;

  /**
   * Returns the default text height.
   *
   * @returns The default text height in pixels.
   */
  defaultTextHeight(): number;

  /** Ends a buffered operation started with startOperation. */
  endOperation(): void;

  /**
   * Executes a named command.
   *
   * @param name - The command name.
   */
  execCommand(name: string): void;

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
   * Finds the target position for horizontal cursor motion.
   *
   * @param start - The starting position.
   * @param amount - The number of units to move (may be negative).
   * @param unit - The unit ("char", "column", or "word").
   * @param visually - Whether motion should be visual rather than logical.
   * @returns The target position, with `hitSide` set if the edge was reached.
   */
  findPosH(start: Position, amount: number, unit: string, visually: boolean): Cm5FindPosResult;

  /**
   * Finds the target position for vertical cursor motion.
   *
   * @param start - The starting position.
   * @param amount - The number of units to move.
   * @param unit - The unit ("line" or "page").
   * @returns The target position, with `hitSide` set if the edge was reached.
   */
  findPosV(start: Position, amount: number, unit: string): Cm5FindPosResult;

  /**
   * Returns the start and end of the word at the given position.
   *
   * @param pos - The position.
   * @returns The range of the word.
   */
  findWordAt(pos: Position): Cm5Range;

  /**
   * Gives focus to the editor.
   */
  focus(): void;

  /**
   * Gets the associated document.
   *
   * @returns The document instance.
   */
  getDoc(): Doc;

  /** Get the value of the 'extending' flag. */
  getExtending(): boolean;

  /**
   * Returns the gutter element.
   *
   * @returns The gutter DOM element.
   */
  getGutterElement(): HTMLElement;

  /**
   * Returns the input field element.
   *
   * @returns The input field DOM element.
   */
  getInputField(): HTMLDivElement | HTMLTextAreaElement;

  /**
   * Retrieves a list of all tokens on the given line.
   *
   * @param line - The line number.
   * @param precise - Whether to use a more precise (but slower) algorithm.
   * @returns An array of tokens.
   */
  getLineTokens(line: number, precise?: boolean): Cm5Token[];

  /**
   * Gets the inner mode at a given position.
   *
   * @param pos - The position.
   * @returns The mode at that position.
   */
  getModeAt(pos: Position): Cm5Mode<unknown>;

  /**
   * Gets the value of an option.
   *
   * @param option - The option name.
   * @returns The option value.
   */
  getOption(option: string): unknown;

  /**
   * Returns the scroller element.
   *
   * @returns The scroller DOM element.
   */
  getScrollerElement(): HTMLElement;

  /**
   * Returns scroll position and dimensions.
   *
   * @returns The scroll info object.
   */
  getScrollInfo(): Cm5ScrollInfo;

  /**
   * Returns the mode's parser state at the end of the given line number.
   *
   * @param line - The line number.
   * @returns The parser state.
   */
  getStateAfter(line?: number): unknown;

  /**
   * Retrieves information about the token at the given position.
   *
   * @param pos - The position.
   * @param precise - Whether to use a more precise algorithm.
   * @returns The token information.
   */
  getTokenAt(pos: Position, precise?: boolean): Cm5Token;

  /**
   * Returns the token type at the given position.
   *
   * @param pos - The position.
   * @returns The token type string, or `null` for unstyled tokens.
   */
  getTokenTypeAt(pos: Position): string;

  /**
   * Returns the start and end of the currently rendered part of the document.
   *
   * @returns An object with `from` and `to` properties.
   */
  getViewport(): Cm5Viewport;

  /**
   * Returns the wrapper element.
   *
   * @returns The wrapper DOM element.
   */
  getWrapperElement(): HTMLElement;

  /**
   * Tells whether the editor currently has focus.
   *
   * @returns `true` if the editor has focus.
   */
  hasFocus(): boolean;

  /**
   * Computes the height of the top of a line.
   *
   * @param line - The line number or handle.
   * @param mode - The coordinate system.
   * @param includeWidgets - Whether to include line widgets.
   * @returns The height in pixels.
   */
  heightAtLine(line: Cm5LineHandle | number, mode?: Cm5CoordsMode, includeWidgets?: boolean): number;

  /**
   * Adjusts the indentation of the given line.
   *
   * @param line - The line number.
   * @param dir - The indentation direction or mode.
   * @param aggressive - Whether to aggressively indent.
   */
  indentLine(line: number, dir?: null | string, aggressive?: boolean): void;

  /** Indents the current selection. */
  indentSelection(how: string): void;

  /** Tells you whether the editor's content can be edited by the user. */
  isReadOnly(): boolean;

  /**
   * Computes the line at the given pixel height.
   *
   * @param height - The pixel height.
   * @param mode - The coordinate system.
   * @returns The line number.
   */
  lineAtHeight(height: number, mode?: Cm5CoordsMode): number;

  /**
   * Returns information about the given line.
   *
   * @param line - The line number or handle.
   * @returns An object with line info properties.
   */
  lineInfo(line: Cm5LineHandle | number): Cm5LineInfo;

  /**
   * Retrieves a list of all current selections.
   *
   * @returns An array of selection ranges.
   */
  listSelections(): Cm5Range[];

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
   * Buffers all changes inside the function and only updates after it returns.
   *
   * @param fn - The function to execute.
   * @returns The return value of the function.
   */
  operation<T>(fn: () => T): T;

  /**
   * Translates a string through the phrases option for i18n.
   *
   * @param text - The text to translate.
   * @returns The translated text.
   */
  phrase(text: string): unknown;

  /**
   * Refreshes the editor display.
   */
  refresh(): void;

  /**
   * Removes a key map from the editor.
   *
   * @param map - The key map to remove.
   */
  removeKeyMap(map: Cm5KeyMap | string): void;

  /**
   * Remove a CSS class from a line.
   *
   * @param line - The line number or handle.
   * @param where - Which element ("text", "background", or "wrap").
   * @param className - The class to remove (omit to remove all).
   * @returns The line handle.
   */
  removeLineClass(line: Cm5LineHandle | number, where: string, className?: string): Cm5LineHandle;

  /**
   * Removes a line widget.
   *
   * @param widget - The widget to remove.
   */
  removeLineWidget(widget: Cm5LineWidget): void;

  /**
   * Removes a mode overlay from the editor.
   *
   * @param mode - The mode or mode name to remove.
   */
  removeOverlay(mode: unknown): void;

  /**
   * Replaces the content of the selections with the given strings.
   *
   * @param replacements - The replacement strings.
   * @param collapse - How to collapse the selection after replacement.
   * @param origin - Optional origin string.
   */
  replaceSelections(replacements: string[], collapse?: null | string, origin?: null | string): void;

  /**
   * Scrolls the editor to the given position.
   *
   * @param pos - The position or rectangle to scroll into view.
   * @param margin - Optional margin in pixels.
   */
  scrollIntoView(pos: Cm5EditorScrollRect | null | Position, margin?: number): void;

  /**
   * Scrolls the editor to the given coordinates.
   *
   * @param x - The horizontal scroll position.
   * @param y - The vertical scroll position.
   */
  scrollTo(x?: null | number, y?: null | number): void;

  /**
   * Sets or clears the 'extending' flag.
   *
   * @param value - Whether to enable extending.
   */
  setExtending(value: boolean): void;

  /**
   * Sets the gutter marker for the given gutter.
   *
   * @param line - The line number or handle.
   * @param gutterID - The gutter's CSS class identifier.
   * @param value - The marker element, or `null` to clear.
   * @returns The line handle.
   */
  setGutterMarker(line: Cm5LineHandle | number, gutterID: string, value: HTMLElement | null): Cm5LineHandle;

  /**
   * Sets the value of an option.
   *
   * @param option - The option name.
   * @param value - The new value.
   */
  setOption(option: string, value: unknown): void;

  /**
   * Sets a new set of selections.
   *
   * @param ranges - The selection ranges.
   * @param primary - The index of the primary selection.
   * @param options - Optional selection options.
   */
  setSelections(ranges: Cm5SelectionRange[], primary?: number, options?: Cm5SelectionOptions): void;

  /**
   * Sets the editor size.
   *
   * @param width - The width (pixels or CSS unit).
   * @param height - The height (pixels or CSS unit).
   */
  setSize(width: null | number | string, height: null | number | string): void;

  /** Starts a buffered operation. */
  startOperation(): void;

  /**
   * Attaches a new document to the editor.
   *
   * @param doc - The new document.
   * @returns The old document.
   */
  swapDoc(doc: Doc): Doc;

  /**
   * Switches between overwrite and normal insert mode.
   *
   * @param value - If given, sets overwrite mode to this value.
   */
  toggleOverwrite(value?: boolean): void;
}
