export { };

import type { VimEditor } from "../index.d.ts";

declare module "@codemirror/view" {
    /** @todo Documentation incomplete */
    interface EditorView {
        cm?: VimEditor;
    }
}
