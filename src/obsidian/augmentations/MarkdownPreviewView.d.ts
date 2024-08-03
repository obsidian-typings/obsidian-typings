import type { ReadViewRenderer } from "../types.js";

export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface MarkdownPreviewView extends MarkdownRenderer {
        /**
         * Unique identifier for the rendered element
         */
        docId: string;
        /**
         * HTML renderer for the Markdown
         */
        renderer: ReadViewRenderer;
        search: null | unknown;
        type: "preview" | string;
        view: MarkdownView;

        applyFoldInfo(e: unknown): unknown;
        beforeUnload(): unknown;
        /**
         * Clears the rendered preview
         */
        clear(): unknown;
        edit(e: unknown): unknown;
        foldAll(): unknown;
        /**
         * Returns the renderer text
         */
        get(): string;
        getEphemeralState(e: unknown): unknown;
        getFoldInfo(): unknown;
        getSelection(): unknown;
        hide(): void;
        onFoldChange(): unknown;
        onRenderComplete(): unknown;
        onResize(): unknown;
        onScroll(): unknown;
        requestUpdateLinks(): unknown;
        /**
         * Set the Preview to new data
         * @param data The data to set the renderer to
         * @param clear If the preview should be cleared
         */
        set(data: string, clear: boolean): void;
        setEphemeralState(e: unknown): unknown;
        show(): void;
        showSearch(): unknown;
        unfoldAll(): unknown;
        updateOptions(): unknown;
    }
}
