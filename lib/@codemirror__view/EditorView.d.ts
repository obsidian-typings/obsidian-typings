export { };

import type { VimEditor } from "./internals/index.d.ts";

declare module "@codemirror/view" {
    /** @todo Documentation incomplete */
    interface EditorView {
        cm?: VimEditor;
    }
}
