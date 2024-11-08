import type { EditorViewState } from '../internals/EditorViewState.js';
import type { VimEditor } from '../internals/VimEditor.js';

export {};

declare module '@codemirror/view' {
    /** @todo Documentation incomplete */
    interface EditorView {
        cm?: VimEditor;
        viewState: EditorViewState;

        measure(): void;
    }
}
