import type { VimEditor } from "../types.d.ts";

export {};

declare module "@codemirror/view" {
    /** @todo Documentation incomplete */
    interface EditorView {
        cm?: VimEditor;
    }
}
