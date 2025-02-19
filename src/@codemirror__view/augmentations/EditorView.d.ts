import type { EditorViewState } from '../internals/EditorViewState.d.ts';
import type { VimEditor } from '../internals/Vim/VimEditor.d.ts';

export {};

declare module '@codemirror/view' {
    /** @todo Documentation incomplete */
    interface EditorView {
        cm?: VimEditor;
        viewState: EditorViewState;

        measure(): void;
    }
}
