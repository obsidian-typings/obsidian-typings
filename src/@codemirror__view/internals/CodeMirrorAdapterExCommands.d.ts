import type { CodeMirrorEditor } from './CodeMirrorEditor.d.ts';

/**
 * Built-in editor commands available through the CodeMirror adapter.
 * @public
 * @unofficial
 */
export interface CodeMirrorAdapterExCommands {
    /** Move the cursor one character to the left. */
    cursorCharLeft(editor: CodeMirrorEditor): void;

    /** Auto-indent the current line or selection. */
    indentAuto(editor: CodeMirrorEditor): void;

    /** Insert a new line and auto-indent. */
    newlineAndIndent(editor: CodeMirrorEditor): void;

    /** Insert a new line before the current line and auto-indent. */
    newlineAndIndentBefore(editor: CodeMirrorEditor): void;

    /** Redo the last undone change. */
    redo(editor: CodeMirrorEditor): void;

    /** Undo the last change. */
    undo(editor: CodeMirrorEditor): void;
}
