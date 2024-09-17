import type {
    EditorPosition,
    Pos
} from 'obsidian';
import type { CodeMirrorEditor } from './CodeMirrorEditor.js';
import type { EditorRange2 } from './EditorRange2.js';
import type { VimApi } from './VimApi.js';
import type { VimEditor } from './VimEditor.js';

/**
 * @public
 */
export interface CodeMirrorAdapter2 {
    new(cm6: VimEditor): CodeMirrorEditor;

    Vim: VimApi;

    isMac: boolean;

    Pos: new(line: number, ch: number) => EditorPosition;

    StringStream: unknown;

    commands: {
        cursorCharLeft: (editor: CodeMirrorEditor) => void;
        redo: (editor: CodeMirrorEditor) => void;
        undo: (editor: CodeMirrorEditor) => void;
        newlineAndIndent: (editor: CodeMirrorEditor) => void;
        newlineAndIndentBefore: (editor: CodeMirrorEditor) => void;
        indentAuto: (editor: CodeMirrorEditor) => void;
    };

    defineOption(option: string, defaultValue: unknown, handler: () => void): void;

    isWordChar(char: string): boolean;

    keys: Record<string, unknown>;

    keyMap: Record<string, unknown>;

    addClass(element: HTMLElement, className: string): void;

    rmClass(element: HTMLElement, className: string): void;

    e_preventDefault(event: Event): void;

    e_stop(event: Event): void;

    keyName(event: KeyboardEvent): string;

    vimKey(event: KeyboardEvent): string;

    lookupKey(
        key: string,
        context: unknown,
        callback: (action: (codeMirrorAdapter: CodeMirrorAdapter2) => boolean) => void
    ): void;

    on(event: string, listener: EventListenerOrEventListenerObject): void;

    off(event: string, listener: EventListenerOrEventListenerObject): void;

    signal(target: unknown, type: string, ...values: unknown[]): void;

    findMatchingTag(doc: CodeMirrorAdapter2, pos: EditorPosition): void;

    findEnclosingTag(doc: CodeMirrorAdapter2, pos: EditorPosition): {
        open: EditorRange2;
        close: EditorRange2;
    } | undefined;
}
