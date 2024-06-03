/**
 * @see Original module
 * {@link https://unpkg.com/@codemirror/view@latest/dist/index.d.ts}
 * {@link file://./../../node_modules/@codemirror/view/dist/index.d.ts}
 */
import "@codemirror/view";

export * from "./internals/index.d.ts";

import type _EditorView from "./EditorView.d.ts";

declare module "@codemirror/view" {
    interface EditorView extends _EditorView { }
}
