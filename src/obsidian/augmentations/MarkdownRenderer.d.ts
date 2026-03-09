import type {
  getMarkdownRendererConstructor
} from '../implementations/constructors/augmentations/getMarkdownRendererConstructor.d.ts';

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
     * Constructor.
     *
     * To extract the constructor type, use `ExtractConstructor<MarkdownRenderer>`.
     *
     * @param app - The app instance.
     * @param containerEl - The container element.
     * @param supportWorker - Whether to use a web worker for rendering.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor3__(app: App, containerEl: HTMLElement, supportWorker?: boolean): this;

    /**
     * The file of the markdown renderer.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link file} instead.
     */
    file__?(): TFile;

    /**
     * Handle a checkbox click event in the rendered markdown.
     *
     * @param e - The checkbox click event.
     * @param n - The line number of the checkbox.
     * @param i - The index of the checkbox.
     * @returns The result of the checkbox click handling.
     * @unofficial
     */
    onCheckboxClick(e: unknown, n: unknown, i: unknown): unknown;

    /**
     * Handle a file change event for the rendered file.
     *
     * @param e - The file change event.
     * @returns The result of the file change handling.
     * @unofficial
     */
    onFileChange(e: unknown): unknown;

    /**
     * Handle a fold state change in the rendered markdown.
     *
     * @returns The result of the fold change handling.
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
     *
     * @returns The result of the render completion handling.
     * @unofficial
     */
    onRenderComplete(): unknown;

    /**
     * Handle a scroll event in the rendered markdown.
     *
     * @returns The result of the scroll handling.
     * @unofficial
     */
    onScroll(): unknown;

    /**
     * The file path associated with this renderer.
     *
     * @returns The file path.
     * @unofficial
     */
    get path(): unknown;

    /**
     * Apply post-processing to the rendered markdown output.
     *
     * @param e - The element to post-process.
     * @param t - The rendering context.
     * @param n - The node associated with the element.
     * @returns The result of the post-processing.
     * @unofficial
     */
    postProcess(e: unknown, t: unknown, n: unknown): unknown;

    /**
     * Resolve internal links in the rendered markdown.
     *
     * @param e - The element containing links to resolve.
     * @returns The result of the link resolution.
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
