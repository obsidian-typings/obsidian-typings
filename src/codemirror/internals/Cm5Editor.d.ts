import type { Cm5EditorCharCoords } from './Cm5EditorCharCoords.d.ts';
import type { Cm5EditorCoordsCharInput } from './Cm5EditorCoordsCharInput.d.ts';
import type { Cm5EditorCursorCoords } from './Cm5EditorCursorCoords.d.ts';
import type { Cm5EditorDisplay } from './Cm5EditorDisplay.d.ts';
import type { Cm5EditorScrollRect } from './Cm5EditorScrollRect.d.ts';
import type { Cm5EditorState } from './Cm5EditorState.d.ts';
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
  addKeyMap(map: object, bottom?: boolean): void;

  /**
   * Adds a mode overlay to the editor.
   *
   * @param mode - The mode or mode name.
   * @param options - Optional overlay options.
   */
  addOverlay(mode: object | string, options?: object): void;

  /**
   * Returns the coordinates for a character position.
   *
   * @param pos - The character position.
   * @param mode - The coordinate system to use.
   * @returns An object with `left`, `right`, `top`, and `bottom` properties.
   */
  charCoords(pos: Position, mode?: 'local' | 'page' | 'window'): Cm5EditorCharCoords;

  /**
   * Returns the position corresponding to the given coordinates.
   *
   * @param coords - The coordinates with `left` and `top` properties.
   * @param mode - The coordinate system used.
   * @returns The corresponding position.
   */
  coordsChar(coords: Cm5EditorCoordsCharInput, mode?: 'local' | 'page' | 'window'): Position;

  /**
   * Returns the coordinates of the cursor.
   *
   * @param where - Whether to return the start or end of the selection.
   * @param mode - The coordinate system to use.
   * @returns An object with `left`, `top`, and `bottom` properties.
   */
  cursorCoords(where?: boolean | Position, mode?: 'local' | 'page' | 'window'): Cm5EditorCursorCoords;

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

  /**
   * Executes a named command.
   *
   * @param name - The command name.
   */
  execCommand(name: string): void;

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
   * Refreshes the editor display.
   */
  refresh(): void;

  /**
   * Removes a key map from the editor.
   *
   * @param map - The key map to remove.
   */
  removeKeyMap(map: object): void;

  /**
   * Removes a mode overlay from the editor.
   *
   * @param mode - The mode or mode name to remove.
   */
  removeOverlay(mode: object | string): void;

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
   * Sets the value of an option.
   *
   * @param option - The option name.
   * @param value - The new value.
   */
  setOption(option: string, value: unknown): void;
}
