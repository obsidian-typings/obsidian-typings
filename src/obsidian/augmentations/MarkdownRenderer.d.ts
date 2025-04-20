export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface MarkdownRenderer extends MarkdownRenderChild, MarkdownPreviewEvents, HoverParent {
        /** @unofficial */
        get path(): unknown;
        /** @unofficial */
        onCheckboxClick(e: unknown, n: unknown, i: unknown): unknown;

        /** @unofficial */
        onFileChange(e: unknown): unknown;

        /** @unofficial */
        onFoldChange(): unknown;

        /** @unofficial */
        onload(): void;

        /** @unofficial */
        onRenderComplete(): unknown;

        /** @unofficial */
        onScroll(): unknown;

        /** @unofficial */
        postProcess(e: unknown, t: unknown, n: unknown): unknown;

        /** @unofficial */
        resolveLinks(e: unknown): unknown;
    }
}
