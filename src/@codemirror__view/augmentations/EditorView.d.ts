import type { EditorViewState } from '../internals/EditorViewState.d.ts';
import type { VimEditor } from '../internals/Vim/VimEditor.d.ts';

export {};

declare module '@codemirror/view' {
    /** @todo Documentation incomplete */
    interface EditorView {
        /** @unofficial */
        cm?: VimEditor;

        /** @unofficial */
        viewState: EditorViewState;

        /** @unofficial */
        measure(): void;
    }
}
