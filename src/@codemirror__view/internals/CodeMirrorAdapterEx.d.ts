import type {
    EditorPosition,
    Pos
} from 'obsidian';
import type { CodeMirrorAdapterExCommands } from './CodeMirrorAdapterExCommands.d.ts';
import type { CodeMirrorEditor } from './CodeMirrorEditor.d.ts';
import type { EnclosingTag } from './EnclosingTag.d.ts';
import type { VimApi } from './Vim/VimApi.d.ts';
import type { VimEditor } from './Vim/VimEditor.d.ts';

/**
 * Extended CodeMirror adapter providing CM5-compatible API over CM6.
 * @public
 * @unofficial
 */
export interface CodeMirrorAdapterEx {
    /** Construct a new CodeMirror editor instance from a Vim editor. */
    new(cm6: VimEditor): CodeMirrorEditor;

    /** Built-in editor commands (undo, redo, indent, etc.). */
    commands: CodeMirrorAdapterExCommands;

    /** Whether the current platform is macOS. */
    isMac: boolean;

    /** Map of key binding names to their handlers. */
    keyMap: Record<string, unknown>;

    /** Map of key names to their handlers. */
    keys: Record<string, unknown>;

    /** Constructor for creating editor position objects. */
    Pos: new(line: number, ch: number) => EditorPosition;

    /** StringStream class for tokenizing input. */
    StringStream: unknown;

    /** The Vim API instance. */
    Vim: VimApi;

    /** Add a CSS class to an HTML element. */
    addClass(element: HTMLElement, className: string): void;

    /** Define a new editor option with a default value and change handler. */
    defineOption(option: string, defaultValue: unknown, handler: () => void): void;

    /** Call preventDefault on the given event. */
    e_preventDefault(event: Event): void;

    /** Stop propagation and prevent default on the given event. */
    e_stop(event: Event): void;

    /** Find the enclosing HTML/XML tag at the given position. */
    findEnclosingTag(doc: CodeMirrorAdapterEx, pos: EditorPosition): EnclosingTag | undefined;

    /** Find the matching HTML/XML tag at the given position. */
    findMatchingTag(doc: CodeMirrorAdapterEx, pos: EditorPosition): void;

    /** Check whether the given character is a word character. */
    isWordChar(char: string): boolean;

    /** Get the key name string from a keyboard event. */
    keyName(event: KeyboardEvent): string;

    /** Look up a key binding and invoke the callback with the associated action. */
    lookupKey(
        key: string,
        context: unknown,
        callback: (action: (codeMirrorAdapter: CodeMirrorAdapterEx) => boolean) => void
    ): void;

    /** Remove an event listener. */
    off(event: string, listener: EventListenerOrEventListenerObject): void;

    /** Add an event listener. */
    on(event: string, listener: EventListenerOrEventListenerObject): void;

    /** Remove a CSS class from an HTML element. */
    rmClass(element: HTMLElement, className: string): void;

    /** Emit a signal/event on the given target. */
    signal(target: unknown, type: string, ...values: unknown[]): void;

    /** Convert a keyboard event to its Vim key representation. */
    vimKey(event: KeyboardEvent): string;
}
