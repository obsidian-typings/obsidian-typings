export {};

declare module 'obsidian' {
    /**
     * A renderer for markdown.
     * @since 0.9.7
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
         * The file path associated with this renderer.
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
         * Handle a checkbox click event in the rendered markdown.
         * @unofficial
         */
        onCheckboxClick(e: unknown, n: unknown, i: unknown): unknown;

        /**
         * Handle a file change event for the rendered file.
         * @unofficial
         */
        onFileChange(e: unknown): unknown;

        /**
         * Handle a fold state change in the rendered markdown.
         * @unofficial
         */
        onFoldChange(): unknown;

        /**
         * Called when the renderer is loaded.
         * @unofficial
         */
        onload(): void;

        /**
         * Called when the markdown rendering is complete.
         * @unofficial
         */
        onRenderComplete(): unknown;

        /**
         * Handle a scroll event in the rendered markdown.
         * @unofficial
         */
        onScroll(): unknown;

        /**
         * Apply post-processing to the rendered markdown output.
         * @unofficial
         */
        postProcess(e: unknown, t: unknown, n: unknown): unknown;

        /**
         * Resolve internal links in the rendered markdown.
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
         * @since 0.10.6
         */
        function renderMarkdown__(
            markdown: string,
            el: HTMLElement,
            sourcePath: string,
            component: Component
        ): Promise<void>;
    }
}
