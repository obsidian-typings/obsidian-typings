import type { Cm5Editor } from './Cm5Editor.d.ts';
import type { Cm5EditorChange } from './Cm5EditorChange.d.ts';
import type { Cm5EditorConfiguration } from './Cm5EditorConfiguration.d.ts';
import type { Cm5KeyMap } from './Cm5KeyMap.d.ts';
import type { Cm5Mode } from './Cm5Mode.d.ts';
import type { Cm5ModeFactory } from './Cm5ModeFactory.d.ts';
import type { Position } from './Position.d.ts';

/**
 * The CodeMirror 5 library module type, representing the `window.CodeMirror` object.
 *
 * @public
 * @unofficial
 */
export interface CodeMirrorModule {
  /** A map of built-in CodeMirror 5 commands. */
  commands: Record<string, (cm: Cm5Editor) => void>;
  /** Default configuration options for CodeMirror 5 editors. */
  defaults: Record<string, unknown>;
  /** A map of key map definitions for CodeMirror 5. */
  keyMap: Record<string, Cm5KeyMap>;
  /** The CodeMirror 5 version string. */
  version: string;

  /** Computes the end position of a change. */
  changeEnd(change: Cm5EditorChange): Position;

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
   * Registers a new editor mode.
   *
   * @param name - The mode name.
   * @param modeFactory - The factory function that creates the mode.
   */
  defineMode<T>(name: string, modeFactory: Cm5ModeFactory<T>): void;

  /**
   * Registers a new editor option.
   *
   * @param name - The option name.
   * @param defaultValue - The default value for the option.
   * @param onUpdate - The update handler.
   */
  defineOption(name: string, defaultValue: unknown, onUpdate: (editor: Cm5Editor, val: unknown, old: unknown) => void): void;

  /**
   * Creates a CodeMirror 5 editor from a textarea element.
   *
   * @param host - The textarea element to replace.
   * @param options - Optional editor configuration.
   * @returns The created editor instance.
   */
  fromTextArea(host: HTMLTextAreaElement, options?: Cm5EditorConfiguration): Cm5Editor;

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
}
