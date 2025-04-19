import type {
    EditorPosition,
    Pos
} from 'obsidian';
import type { CodeMirrorAdapterExCommands } from './CodeMirrorAdapterExCommands.d.ts';
import type { CodeMirrorEditor } from './CodeMirrorEditor.d.ts';
import type { EnclosingTag } from './EnclosingTag.d.ts';
import type { VimApi } from './Vim/VimApi.d.ts';
import type { VimEditor } from './Vim/VimEditor.d.ts';

/** @public @unofficial */
export interface CodeMirrorAdapterEx {
    new(cm6: VimEditor): CodeMirrorEditor;
    commands: CodeMirrorAdapterExCommands;
    isMac: boolean;
    keyMap: Record<string, unknown>;
    keys: Record<string, unknown>;
    Pos: new(line: number, ch: number) => EditorPosition;
    StringStream: unknown;
    Vim: VimApi;

    addClass(element: HTMLElement, className: string): void;
    defineOption(option: string, defaultValue: unknown, handler: () => void): void;
    e_preventDefault(event: Event): void;
    e_stop(event: Event): void;
    findEnclosingTag(doc: CodeMirrorAdapterEx, pos: EditorPosition): EnclosingTag | undefined;
    findMatchingTag(doc: CodeMirrorAdapterEx, pos: EditorPosition): void;
    isWordChar(char: string): boolean;
    keyName(event: KeyboardEvent): string;
    lookupKey(
        key: string,
        context: unknown,
        callback: (action: (codeMirrorAdapter: CodeMirrorAdapterEx) => boolean) => void
    ): void;
    off(event: string, listener: EventListenerOrEventListenerObject): void;
    on(event: string, listener: EventListenerOrEventListenerObject): void;
    rmClass(element: HTMLElement, className: string): void;
    signal(target: unknown, type: string, ...values: unknown[]): void;
    vimKey(event: KeyboardEvent): string;
}
