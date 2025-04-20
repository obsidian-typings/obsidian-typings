export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface MarkdownRenderer extends MarkdownRenderChild, MarkdownPreviewEvents, HoverParent {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        get path(): unknown;
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onCheckboxClick(e: unknown, n: unknown, i: unknown): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onFileChange(e: unknown): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onFoldChange(): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onload(): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onRenderComplete(): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onScroll(): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        postProcess(e: unknown, t: unknown, n: unknown): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        resolveLinks(e: unknown): unknown;
    }
}
