import type { EditorView } from '@codemirror/view';
import type {
  EditorPosition,
  Pos
} from 'obsidian';

import type { Cm5KeyMap } from '../../codemirror/internals/Cm5KeyMap.d.ts';
import type { Cm5StringStream } from '../../codemirror/internals/Cm5StringStream.d.ts';
import type { ConstructorBase } from '../../obsidian/internals/constructors/ConstructorBase.d.ts';
import type { CodeMirrorAdapterExCommands } from './CodeMirrorAdapterExCommands.d.ts';
import type { CodeMirrorEditor } from './CodeMirrorEditor.d.ts';
import type { EnclosingTag } from './EnclosingTag.d.ts';
import type { VimApi } from './vim/VimApi.d.ts';

/**
 * Extended CodeMirror adapter providing CM5-compatible API over CM6.
 *
 * @public
 * @unofficial
 */
export interface CodeMirrorAdapterEx {
  /**
   * Construct a CodeMirror 5 compatible adapter around a CodeMirror 6 view.
   *
   * @param cm6 - The view to wrap.
   * @returns The created adapter.
   */
  new (cm6: EditorView): CodeMirrorEditor;

  /**
   * Built-in editor commands (undo, redo, indent, etc.).
   */
  commands: CodeMirrorAdapterExCommands;

  /**
   * Whether the current platform is macOS.
   */
  isMac: boolean;

  /**
   * Map of key names to their handlers.
   */
  keys: Cm5KeyMap;

  /**
   * Constructor for creating editor position objects.
   *
   * @param line - The line number.
   * @param ch - The character offset.
   * @returns The created editor position.
   */
  Pos: new (line: number, ch: number) => EditorPosition;

  /**
   * StringStream class for tokenizing input.
   */
  StringStream: ConstructorBase<[text: string], Cm5StringStream>;

  /**
   * The Vim API instance.
   */
  Vim: VimApi;

  /**
   * Add a CSS class to an HTML element.
   *
   * @param element - The HTML element to add the class to.
   * @param className - The CSS class name to add.
   */
  addClass(element: HTMLElement, className: string): void;

  /**
   * Call preventDefault on the given event.
   *
   * @param event - The event to prevent default on.
   */
  e_preventDefault(event: Event): void;

  /**
   * Stop propagation and prevent default on the given event.
   *
   * @param event - The event to stop.
   */
  e_stop(event: Event): void;

  /**
   * Find the enclosing HTML/XML tag at the given position.
   *
   * @param doc - The CodeMirror adapter instance.
   * @param pos - The editor position to search from.
   * @returns The enclosing tag, or `undefined` if not found.
   */
  findEnclosingTag(doc: CodeMirrorAdapterEx, pos: EditorPosition): EnclosingTag | undefined;

  /**
   * Find the matching HTML/XML tag at the given position.
   *
   * @param doc - The CodeMirror adapter instance.
   * @param pos - The editor position to search from.
   */
  findMatchingTag(doc: CodeMirrorAdapterEx, pos: EditorPosition): void;

  /**
   * Check whether the given character is a word character.
   *
   * @param char - The character to check.
   * @returns Whether the character is a word character.
   */
  isWordChar(char: string): boolean;

  /**
   * Get the key name string from a keyboard event.
   *
   * @param event - The keyboard event.
   * @returns The key name string.
   */
  keyName(event: KeyboardEvent): string;

  /**
   * Look up a key binding and invoke the callback with the associated action.
   *
   * @param key - The key binding to look up.
   * @param context - The context for the key lookup.
   * @param callback - The callback invoked with the associated action.
   */
  lookupKey(
    key: string,
    context: unknown,
    callback: (action: (codeMirrorAdapter: CodeMirrorAdapterEx) => boolean) => void
  ): void;

  /**
   * Remove an event listener.
   *
   * @param event - The event name.
   * @param listener - The event listener to remove.
   */
  off(event: string, listener: EventListenerOrEventListenerObject): void;

  /**
   * Add an event listener.
   *
   * @param event - The event name.
   * @param listener - The event listener to add.
   */
  on(event: string, listener: EventListenerOrEventListenerObject): void;

  /**
   * Remove a CSS class from an HTML element.
   *
   * @param element - The HTML element to remove the class from.
   * @param className - The CSS class name to remove.
   */
  rmClass(element: HTMLElement, className: string): void;

  /**
   * Emit a signal/event on the given target.
   *
   * @param target - The target to emit the signal on.
   * @param type - The signal/event type.
   * @param values - Additional values to pass to the signal handlers.
   */
  signal(target: unknown, type: string, ...values: unknown[]): void;
}
