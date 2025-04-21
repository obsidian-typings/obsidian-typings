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
 * @public
 * @unofficial
 */
export interface CodeMirrorAdapterEx {
    /** @todo Documentation incomplete. */
    new(cm6: VimEditor): CodeMirrorEditor;

    /** @todo Documentation incomplete. */
    commands: CodeMirrorAdapterExCommands;

    /** @todo Documentation incomplete. */
    isMac: boolean;

    /** @todo Documentation incomplete. */
    keyMap: Record<string, unknown>;

    /** @todo Documentation incomplete. */
    keys: Record<string, unknown>;

    /** @todo Documentation incomplete. */
    Pos: new(line: number, ch: number) => EditorPosition;

    /** @todo Documentation incomplete. */
    StringStream: unknown;

    /** @todo Documentation incomplete. */
    Vim: VimApi;

    /** @todo Documentation incomplete. */
    addClass(element: HTMLElement, className: string): void;

    /** @todo Documentation incomplete. */
    defineOption(option: string, defaultValue: unknown, handler: () => void): void;

    /** @todo Documentation incomplete. */
    e_preventDefault(event: Event): void;

    /** @todo Documentation incomplete. */
    e_stop(event: Event): void;

    /** @todo Documentation incomplete. */
    findEnclosingTag(doc: CodeMirrorAdapterEx, pos: EditorPosition): EnclosingTag | undefined;

    /** @todo Documentation incomplete. */
    findMatchingTag(doc: CodeMirrorAdapterEx, pos: EditorPosition): void;

    /** @todo Documentation incomplete. */
    isWordChar(char: string): boolean;

    /** @todo Documentation incomplete. */
    keyName(event: KeyboardEvent): string;

    /** @todo Documentation incomplete. */
    lookupKey(
        key: string,
        context: unknown,
        callback: (action: (codeMirrorAdapter: CodeMirrorAdapterEx) => boolean) => void
    ): void;

    /** @todo Documentation incomplete. */
    off(event: string, listener: EventListenerOrEventListenerObject): void;

    /** @todo Documentation incomplete. */
    on(event: string, listener: EventListenerOrEventListenerObject): void;

    /** @todo Documentation incomplete. */
    rmClass(element: HTMLElement, className: string): void;

    /** @todo Documentation incomplete. */
    signal(target: unknown, type: string, ...values: unknown[]): void;

    /** @todo Documentation incomplete. */
    vimKey(event: KeyboardEvent): string;
}
