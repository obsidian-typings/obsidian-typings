import type { CodeMirrorEditor } from './CodeMirrorEditor.d.ts';

/** @public */
export interface CodeMirrorAdapterExCommands {
    cursorCharLeft(editor: CodeMirrorEditor): void;
    indentAuto(editor: CodeMirrorEditor): void;
    newlineAndIndent(editor: CodeMirrorEditor): void;
    newlineAndIndentBefore(editor: CodeMirrorEditor): void;
    redo(editor: CodeMirrorEditor): void;
    undo(editor: CodeMirrorEditor): void;
}
