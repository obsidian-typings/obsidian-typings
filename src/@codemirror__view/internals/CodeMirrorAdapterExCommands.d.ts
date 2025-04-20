import type { CodeMirrorEditor } from './CodeMirrorEditor.d.ts';

/**
 * @public
 * @unofficial
 */
export interface CodeMirrorAdapterExCommands {
    /**
     * @todo Documentation incomplete.
     */
    cursorCharLeft(editor: CodeMirrorEditor): void;

    /**
     * @todo Documentation incomplete.
     */
    indentAuto(editor: CodeMirrorEditor): void;

    /**
     * @todo Documentation incomplete.
     */
    newlineAndIndent(editor: CodeMirrorEditor): void;

    /**
     * @todo Documentation incomplete.
     */
    newlineAndIndentBefore(editor: CodeMirrorEditor): void;

    /**
     * @todo Documentation incomplete.
     */
    redo(editor: CodeMirrorEditor): void;

    /**
     * @todo Documentation incomplete.
     */
    undo(editor: CodeMirrorEditor): void;
}
