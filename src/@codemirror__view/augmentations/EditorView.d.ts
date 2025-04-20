import type { EditorViewState } from '../internals/EditorViewState.d.ts';
import type { VimEditor } from '../internals/Vim/VimEditor.d.ts';

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        cm?: VimEditor;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        viewState: EditorViewState;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        measure(): void;
    }
}
