export { };

import type { VimEditor } from "../types.d.ts";

declare module "@codemirror/view" {
    /** @todo Documentation incomplete */
    interface EditorView {
        cm?: VimEditor;
    }
}
