import type { VimEditor } from "../types.js";

export {};

declare module "@codemirror/view" {
    /** @todo Documentation incomplete */
    interface EditorView {
        cm?: VimEditor;
    }
}
