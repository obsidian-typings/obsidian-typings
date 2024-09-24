import type {
    EditorPosition,
    Pos
} from 'obsidian';
import type { CodeMirrorEditor } from './CodeMirrorEditor.js';
import type { EditorRange2 } from './EditorRange2.js';
import type { VimApi } from './VimApi.js';
import type { VimEditor } from './VimEditor.js';

/** @public */
export interface CodeMirrorAdapter2 {
    new(cm6: VimEditor): CodeMirrorEditor;
    commands: {
        cursorCharLeft: (editor: CodeMirrorEditor) => void;
        redo: (editor: CodeMirrorEditor) => void;
        undo: (editor: CodeMirrorEditor) => void;
        newlineAndIndent: (editor: CodeMirrorEditor) => void;
        newlineAndIndentBefore: (editor: CodeMirrorEditor) => void;
        indentAuto: (editor: CodeMirrorEditor) => void;
    };
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
    findEnclosingTag(doc: CodeMirrorAdapter2, pos: EditorPosition): {
        open: EditorRange2;
        close: EditorRange2;
    } | undefined;
    findMatchingTag(doc: CodeMirrorAdapter2, pos: EditorPosition): void;
    isWordChar(char: string): boolean;
    keyName(event: KeyboardEvent): string;
    lookupKey(
        key: string,
        context: unknown,
        callback: (action: (codeMirrorAdapter: CodeMirrorAdapter2) => boolean) => void
    ): void;
    off(event: string, listener: EventListenerOrEventListenerObject): void;
    on(event: string, listener: EventListenerOrEventListenerObject): void;
    rmClass(element: HTMLElement, className: string): void;
    signal(target: unknown, type: string, ...values: unknown[]): void;
    vimKey(event: KeyboardEvent): string;
}
