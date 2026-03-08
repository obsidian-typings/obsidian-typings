import type { EditorViewState } from '../internals/EditorViewState.d.ts';
import type { VimEditor } from '../internals/vim/VimEditor.d.ts';

export {};

declare module '@codemirror/view' {
    /**
     * An editor view represents the editor's user interface. It holds
     * the editable DOM surface, and possibly other elements such as the
     * line number gutter. It handles events and dispatches state
     * transactions for editing actions.
     */
    interface EditorView {
        /**
         * The Vim editor instance attached to this view, if Vim mode is enabled.
         * @unofficial
         */
        cm?: VimEditor;

        /**
         * Request a layout measurement pass on the editor.
         * @unofficial
         */
        measure(): void;

        /**
         * Internal view state tracking properties like printing mode.
         * @unofficial
         */
        viewState: EditorViewState;
    }
}
