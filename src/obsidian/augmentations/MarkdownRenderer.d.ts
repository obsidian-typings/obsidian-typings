export {};

declare module 'obsidian' {
    /**
     * A renderer for markdown.
     */
    interface MarkdownRenderer extends MarkdownRenderChild, MarkdownPreviewEvents, HoverParent {
        /**
         * The Obsidian app instance.
         *
         * @official
         */
        app: App;

        /**
         * The hover popover of the markdown renderer.
         *
         * @official
         */
        hoverPopover: HoverPopover | null;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        get path(): unknown;

        /**
         * The file of the markdown renderer.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link file} instead.
         */
        file__?(): TFile;

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

    namespace MarkdownRenderer {
        /**
         * Renders Markdown string to an HTML element.
         *
         * @param app - A reference to the app object.
         * @param markdown - The Markdown source code.
         * @param el - The element to append to.
         * @param sourcePath - The normalized path of this Markdown file, used to resolve relative internal links.
         * @param component - A parent component to manage the lifecycle of the rendered child components.
         * @returns A promise that resolves when the markdown is rendered.
         *
         * @example
         * ```ts
         * MarkdownRenderer.render(app, '**foo** bar', document.body, 'baz.md', new Component());
         * ```
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link render} instead.
         */
        function render__(
            app: App,
            markdown: string,
            el: HTMLElement,
            sourcePath: string,
            component: Component
        ): Promise<void>;

        /**
         * Renders Markdown string to an HTML element.
         *
         * @param markdown - The Markdown source code.
         * @param el - The element to append to.
         * @param sourcePath - The normalized path of this Markdown file, used to resolve relative internal links.
         * @param component - A parent component to manage the lifecycle of the rendered child components.
         * @returns A promise that resolves when the markdown is rendered.
         *
         * @example
         * ```ts
         * MarkdownRenderer.renderMarkdown('**foo** bar', document.body, 'baz.md', new Component());
         * ```
         *
         * @deprecated - use {@link MarkdownRenderer.render}
         * @official
         * @deprecated - Added only for typing purposes. Use {@link renderMarkdown} instead.
         */
        function renderMarkdown__(
            markdown: string,
            el: HTMLElement,
            sourcePath: string,
            component: Component
        ): Promise<void>;
    }
}
