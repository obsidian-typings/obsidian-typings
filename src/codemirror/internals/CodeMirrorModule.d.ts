import type { Cm5Editor } from './Cm5Editor.d.ts';
import type { Cm5EditorChange } from './Cm5EditorChange.d.ts';
import type { Cm5EditorConfiguration } from './Cm5EditorConfiguration.d.ts';
import type { Cm5InnerModeResult } from './Cm5InnerModeResult.d.ts';
import type { Cm5KeyMap } from './Cm5KeyMap.d.ts';
import type { Cm5Mode } from './Cm5Mode.d.ts';
import type { Cm5ModeFactory } from './Cm5ModeFactory.d.ts';
import type { Cm5ModeSpec } from './Cm5ModeSpec.d.ts';
import type { Cm5Pass } from './Cm5Pass.d.ts';
import type { Position } from './Position.d.ts';

/**
 * The CodeMirror 5 library module type, representing the `window.CodeMirror` object.
 *
 * @public
 * @unofficial
 */
export interface CodeMirrorModule {
  /** Adds a CSS class to a node. */
  addClass: unknown;
  /** A map of built-in CodeMirror 5 commands. */
  commands: Record<string, (cm: Cm5Editor) => void>;
  /** Checks whether one node contains another. */
  contains: unknown;
  /** Copies a mode state object. */
  copyState: unknown;
  /** Default configuration options for CodeMirror 5 editors. */
  defaults: Record<string, unknown>;
  /** The CodeMirror 5 `Doc` constructor. */
  Doc: unknown;
  /** Prevents the default action of an event. */
  e_preventDefault: unknown;
  /** Stops an event (prevents default and stops propagation). */
  e_stop: unknown;
  /** Stops propagation of an event. */
  e_stopPropagation: unknown;
  /** Finds the character offset for a given column. */
  findColumn: unknown;
  /** Finds a mode spec by file extension. */
  findModeByExtension: unknown;
  /** Finds a mode spec by file name. */
  findModeByFileName: unknown;
  /** Finds a mode spec by MIME type. */
  findModeByMIME: unknown;
  /** Finds a mode spec by name. */
  findModeByName: unknown;
  /** The code-folding helper namespace. */
  fold: unknown;
  /** Registered helper namespaces. */
  helpers: unknown;
  /** Sentinel value passed as the "old value" on the first option update. */
  Init: unknown;
  /** Registered input-style implementations. */
  inputStyles: unknown;
  /** Checks whether a keyboard event is a modifier keypress. */
  isModifierKey: unknown;
  /** A map of key map definitions for CodeMirror 5. */
  keyMap: Record<string, Cm5KeyMap>;
  /** Gets the key name for a keyboard event. */
  keyName: unknown;
  /** A map of key codes to key names. */
  keyNames: unknown;
  /** The CodeMirror 5 `Line` constructor. */
  Line: unknown;
  /** The CodeMirror 5 `LineWidget` constructor. */
  LineWidget: unknown;
  /** Looks up a key binding in a keymap. */
  lookupKey: unknown;
  /** Maps MIME types to mode specifications. */
  mimeModes: Record<string, Cm5ModeSpec<unknown> | string>;
  /** Registered mode extensions. */
  modeExtensions: unknown;
  /** The list of known mode descriptors. */
  modeInfo: unknown;
  /** The mode map, mapping mode names to their factory constructors. */
  modes: Record<string, Cm5ModeFactory<unknown>>;
  /** Creates a fold function for a given fold helper. */
  newFoldFunction: unknown;
  /** Registered option handlers. */
  optionHandlers: unknown;
  /** A sentinel value that key handlers can return to indicate the binding should fall through. */
  Pass: Cm5Pass;
  /** Resolves a mode spec to a normalized form. */
  resolveMode: unknown;
  /** Removes a CSS class from a node. */
  rmClass: unknown;
  /** Registered scrollbar-model implementations. */
  scrollbarModel: unknown;
  /** The CodeMirror 5 `SharedTextMarker` constructor. */
  SharedTextMarker: unknown;
  /** The CodeMirror 5 `StringStream` constructor. */
  StringStream: unknown;
  /** The CodeMirror 5 `TextMarker` constructor. */
  TextMarker: unknown;
  /** The CodeMirror 5 version string. */
  version: string;
  /** The CodeMirror 5 Vim-mode API. */
  Vim: unknown;
  /** Computes pixel deltas for a wheel event. */
  wheelEventPixels: unknown;

  /** Computes the end position of a change. */
  changeEnd(change: Cm5EditorChange): Position;

  /**
   * Compares two positions.
   *
   * @param a - The first position.
   * @param b - The second position.
   * @returns A negative number if `a` is before `b`, positive if after, zero if equal.
   */
  cmpPos(a: Position, b: Position): number;

  /**
   * Finds the column position at a given string index using a given tab size.
   *
   * @param line - The line string.
   * @param index - The string index (or `null` for end of line).
   * @param tabSize - The tab size.
   * @returns The column number.
   */
  countColumn(line: string, index: null | number, tabSize: number): number;

  /**
   * Like defineExtension, but the method will be added to Doc objects instead.
   *
   * @param name - The extension name.
   * @param value - The extension implementation.
   */
  defineDocExtension(name: string, value: unknown): void;

  /**
   * Registers a new editor extension method.
   *
   * @param name - The extension name.
   * @param value - The extension implementation.
   */
  defineExtension(name: string, value: unknown): void;

  /**
   * Registers a function to be called when an editor is initialized.
   *
   * @param f - The initialization hook function.
   */
  defineInitHook(f: (cm: Cm5Editor) => void): void;

  /**
   * Registers a MIME type with its associated mode specification.
   *
   * @param mime - The MIME type string.
   * @param modeSpec - The mode specification.
   */
  defineMIME(mime: string, modeSpec: Cm5ModeSpec<unknown> | string): void;

  /**
   * Registers a new editor mode.
   *
   * @param name - The mode name.
   * @param modeFactory - The factory function that creates the mode.
   * @param dependencies - The names of the modes this mode is built on top of.
   */
  defineMode<T>(name: string, modeFactory: Cm5ModeFactory<T>, ...dependencies: string[]): void;

  /**
   * Registers a new editor option.
   *
   * @param name - The option name.
   * @param defaultValue - The default value for the option.
   * @param onUpdate - The update handler.
   */
  defineOption(name: string, defaultValue: unknown, onUpdate: (editor: Cm5Editor, val: unknown, old: unknown) => void): void;

  /**
   * Adds or overrides properties on mode objects produced for a specific mode.
   *
   * @param name - The mode name.
   * @param properties - The properties to add.
   */
  extendMode(name: string, properties: Partial<Cm5Mode<unknown>>): void;

  /**
   * Creates a CodeMirror 5 editor from a textarea element.
   *
   * @param host - The textarea element to replace.
   * @param options - Optional editor configuration.
   * @returns The created editor instance.
   */
  fromTextArea(host: HTMLTextAreaElement, options?: Cm5EditorConfiguration): Cm5Editor;

  /**
   * Creates a mode object for the given mode specification.
   *
   * @param config - The editor configuration.
   * @param modeSpec - The mode name or specification.
   * @returns The resolved mode object.
   */
  getMode(config: Cm5EditorConfiguration, modeSpec: Cm5ModeSpec<unknown> | string): Cm5Mode<unknown>;

  /**
   * Returns the inner mode and its state for the current position.
   *
   * @param mode - The outer mode.
   * @param state - The mode state.
   * @returns An object with the inner mode and state.
   */
  innerMode(mode: Cm5Mode<unknown>, state: unknown): Cm5InnerModeResult;

  /**
   * Checks whether a character is a word character.
   *
   * @param ch - The character to check.
   * @returns `true` if the character is a word character.
   */
  isWordChar(ch: string): boolean;

  /**
   * Normalizes a key map, expanding multi-stroke key bindings.
   *
   * @param keymap - The key map to normalize.
   * @returns The normalized key map.
   */
  normalizeKeyMap(keymap: Cm5KeyMap): Cm5KeyMap;

  /**
   * Removes an event handler from the given target.
   *
   * @param target - The target object.
   * @param type - The event type.
   * @param f - The event handler to remove.
   */
  off(target: unknown, type: string, f: (...args: unknown[]) => void): void;

  /**
   * Registers an event handler on the given target.
   *
   * @param target - The target object.
   * @param type - The event type.
   * @param f - The event handler.
   */
  on(target: unknown, type: string, f: (...args: unknown[]) => void): void;

  /**
   * Utility function to create an overlay mode combining two modes.
   *
   * @param base - The base mode.
   * @param overlay - The overlay mode.
   * @param combine - Whether to combine styles instead of letting overlay win.
   * @returns The combined mode.
   */
  overlayMode(base: Cm5Mode<unknown>, overlay: Cm5Mode<unknown>, combine?: boolean): Cm5Mode<unknown>;

  /**
   * A constructor function for creating {@link Position} objects.
   *
   * @param line - The line number.
   * @param ch - The character position.
   * @param sticky - The sticky direction.
   * @returns The created position.
   */
  Pos(line: number, ch?: number, sticky?: string): Position;

  /**
   * Registers a global helper with a predicate.
   *
   * @param type - The helper type.
   * @param name - The helper name.
   * @param predicate - A predicate function to determine applicability.
   * @param value - The helper implementation.
   */
  registerGlobalHelper(type: string, name: string, predicate: (mode: Cm5Mode<unknown>, cm: Cm5Editor) => boolean, value: unknown): void;

  /**
   * Registers a helper value for a specific type.
   *
   * @param type - The helper type.
   * @param name - The helper name.
   * @param value - The helper implementation.
   */
  registerHelper(type: string, name: string, value: unknown): void;

  /**
   * Fires a signal (event) on the given target.
   *
   * @param target - The target object.
   * @param name - The signal name.
   * @param args - Additional arguments to pass to handlers.
   */
  signal(target: unknown, name: string, ...args: unknown[]): void;

  /**
   * Splits a string by newline characters.
   *
   * @param text - The text to split.
   * @returns An array of lines.
   */
  splitLines(text: string): string[];

  /**
   * Calls startState of the mode if available, otherwise returns `true`.
   *
   * @param mode - The mode.
   * @returns The initial state, or `true` if no startState method exists.
   */
  startState<T>(mode: Cm5Mode<T>): boolean | T;
}
