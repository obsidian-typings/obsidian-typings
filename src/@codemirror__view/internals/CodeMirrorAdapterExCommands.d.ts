import type { CodeMirrorEditor } from './CodeMirrorEditor.d.ts';

/**
 * Built-in editor commands available through the CodeMirror adapter.
 * @public
 * @unofficial
 */
export interface CodeMirrorAdapterExCommands {
    /**
     * Move the cursor one character to the left.
     *
     * @param editor - The editor instance.
     */
    cursorCharLeft(editor: CodeMirrorEditor): void;

    /**
     * Auto-indent the current line or selection.
     *
     * @param editor - The editor instance.
     */
    indentAuto(editor: CodeMirrorEditor): void;

    /**
     * Insert a new line and auto-indent.
     *
     * @param editor - The editor instance.
     */
    newlineAndIndent(editor: CodeMirrorEditor): void;

    /**
     * Insert a new line before the current line and auto-indent.
     *
     * @param editor - The editor instance.
     */
    newlineAndIndentBefore(editor: CodeMirrorEditor): void;

    /**
     * Redo the last undone change.
     *
     * @param editor - The editor instance.
     */
    redo(editor: CodeMirrorEditor): void;

    /**
     * Undo the last change.
     *
     * @param editor - The editor instance.
     */
    undo(editor: CodeMirrorEditor): void;
}
