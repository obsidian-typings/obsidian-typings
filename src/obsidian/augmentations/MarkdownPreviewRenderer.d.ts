import type { getMarkdownPreviewRendererConstructor } from '../implementations/constructors/augmentations/getMarkdownPreviewRendererConstructor.d.ts';
import type { CodeBlockPostProcessorHandler } from '../internals/CodeBlockPostProcessorHandler.d.ts';
import type { DomEventsHandlers } from '../internals/DomEventsHandlers.d.ts';
import type { FoldInfo } from '../internals/FoldInfo.d.ts';

export {};

declare module 'obsidian' {
  /**
   * The renderer of the markdown preview.
   *
   * @since 0.9.7
   */
  interface MarkdownPreviewRenderer {
    /**
     * Adds a footer section to the rendered preview.
     *
     * @unofficial
     */
    addFooter(): void;

    /**
     * Adds a header section to the rendered preview.
     *
     * @unofficial
     */
    addHeader(): void;

    /**
     * Applies fold information to the preview.
     *
     * @param foldInfo - The fold information to apply, or `null` to clear.
     * @unofficial
     */
    applyFoldInfo(foldInfo: FoldInfo | null): void;

    /**
     * Scrolls the preview to a position.
     *
     * @param scroll - The scroll position.
     * @param options - Scroll options.
     * @returns Whether the scroll was applied.
     * @unofficial
     */
    applyScroll(scroll: number, options?: MarkdownPreviewScrollOptions): boolean;

    /**
     * Scrolls the preview to a position once rendering has completed.
     *
     * @param scroll - The scroll position.
     * @param options - Scroll options.
     * @param callback - Called once the scroll has been applied.
     * @unofficial
     */
    applyScrollDelayed(scroll: number, options?: MarkdownPreviewScrollOptions, callback?: () => void): void;

    /**
     * Scrolls the preview so the given section is at the top.
     *
     * @param section - The section to scroll to.
     * @returns `true` when the scroll was applied, otherwise `undefined`.
     * @unofficial
     */
    applyScrollSection(section: unknown): boolean | undefined;

    /**
     * Checks whether an element belongs to this renderer.
     *
     * @param el - The element to check.
     * @returns Whether the element belongs to this renderer.
     * @unofficial
     */
    belongsToMe(el: HTMLElement): boolean;

    /**
     * Removes child components whose elements no longer belong to this renderer.
     *
     * @unofficial
     */
    cleanupParentComponents(): void;

    /**
     * Clears the rendered sections.
     *
     * @unofficial
     */
    clear(): void;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getMarkdownPreviewRendererConstructor} from `obsidian-typings/implementations`.
     *
     * @param owner - The owner.
     * @param containerEl - The containerEl.
     * @param parentEl - The parentEl.
     * @param workerPath - The workerPath.
     * @param observeInsertion - The observeInsertion.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor__?(
      owner: unknown,
      containerEl: HTMLElement,
      parentEl: HTMLElement,
      workerPath: unknown,
      observeInsertion?: boolean
    ): this;

    /**
     * Folds all headings in the preview.
     *
     * @unofficial
     */
    foldAllHeadings(): void;

    /**
     * Folds all lists in the preview.
     *
     * @unofficial
     */
    foldAllLists(): void;

    /**
     * Gets the current fold information.
     *
     * @returns The fold information.
     * @unofficial
     */
    getFoldInfo(): FoldInfo;

    /**
     * Gets the internal-link href for an element, if it belongs to this renderer.
     *
     * @param el - The element to read the href from.
     * @returns The href, or `null` if not an internal link belonging to this renderer.
     * @unofficial
     */
    getInternalLinkHref(el: HTMLElement): null | string;

    /**
     * Gets the current scroll position.
     *
     * @returns The scroll position, or `null` when there are no sections.
     * @unofficial
     */
    getScroll(): null | number;

    /**
     * Gets the section whose element contains the given element.
     *
     * @param el - The element to search for.
     * @returns The containing section, or `null` if none.
     * @unofficial
     */
    getSectionContainer(el: HTMLElement): unknown;

    /**
     * Gets the section whose element contains the given element.
     *
     * @param el - The element to search for.
     * @returns The section, or `null` if none.
     * @unofficial
     */
    getSectionForElement(el: HTMLElement): unknown;

    /**
     * Gets section information for an element.
     *
     * @param el - The element to get section info for.
     * @returns The section information, or `null` if the element does not belong to this renderer.
     * @unofficial
     */
    getSectionInfo(el: HTMLElement): MarkdownSectionInformation | null;

    /**
     * Gets the scroll-top offset of a section.
     *
     * @param section - The section to measure.
     * @returns The offset in pixels, or `-1` if not found.
     * @unofficial
     */
    getSectionTop(section: unknown): number;

    /**
     * Checks whether an element belongs to one of this renderer's sections.
     *
     * @param el - The element to check.
     * @returns Whether the element is one of this renderer's sections.
     * @unofficial
     */
    handleDetached(el: HTMLElement): boolean;

    /**
     * Briefly highlights an element.
     *
     * @param el - The element to highlight.
     * @unofficial
     */
    highlightEl(el: HTMLElement): void;

    /**
     * Measures the rendered height of a section.
     *
     * @param section - The section to measure.
     * @unofficial
     */
    measureSection(section: unknown): void;

    /**
     * Handles a checkbox click within the preview.
     *
     * @param evt - The mouse event.
     * @param el - The checkbox element.
     * @unofficial
     */
    onCheckboxClick(evt: MouseEvent, el: HTMLElement): void;

    /**
     * Handles a footnote-link click within the preview.
     *
     * @param evt - The mouse event.
     * @param el - The footnote-link element.
     * @unofficial
     */
    onFootnoteLinkClick(evt: MouseEvent, el: HTMLElement): void;

    /**
     * Handles a heading-collapse-indicator click within the preview.
     *
     * @param evt - The mouse event.
     * @param el - The collapse-indicator element.
     * @unofficial
     */
    onHeadingCollapseClick(evt: MouseEvent, el: HTMLElement): void;

    /**
     * Handles a list-collapse-indicator click within the preview.
     *
     * @param evt - The mouse event.
     * @param el - The collapse-indicator element.
     * @unofficial
     */
    onListCollapseClick(evt: MouseEvent, el: HTMLElement): void;

    /**
     * Renders the queued sections.
     *
     * @unofficial
     */
    onRender(): void;

    /**
     * Registers a callback to run after the next render, or immediately if already rendered.
     *
     * @param callback - The callback to run.
     * @unofficial
     */
    onRendered(callback: () => void): void;

    /**
     * Handles a resize of the preview container.
     *
     * @unofficial
     */
    onResize(): void;

    /**
     * Handles a scroll of the preview container.
     *
     * @unofficial
     */
    onScroll(): void;

    /**
     * Parses the current text asynchronously.
     *
     * @unofficial
     */
    parseAsync(): void;

    /**
     * Finalizes a parse result into sections.
     *
     * @param text - The parsed text.
     * @param parseResult - The parse output.
     * @unofficial
     */
    parseFinish(text: string, parseResult: unknown): void;

    /**
     * Parses the current text synchronously.
     *
     * @unofficial
     */
    parseSync(): void;

    /**
     * Queues a render of the preview.
     *
     * @unofficial
     */
    queueRender(): void;

    /**
     * Removes the footer section from the preview.
     *
     * @unofficial
     */
    removeFooter(): void;

    /**
     * Removes the header section from the preview.
     *
     * @unofficial
     */
    removeHeader(): void;

    /**
     * Renders search highlights across a range of sections.
     *
     * @param startSection - The first section index.
     * @param endSection - The last section index.
     * @unofficial
     */
    renderHighlights(startSection: number, endSection: number): void;

    /**
     * Re-renders the preview.
     *
     * @param full - Whether to fully re-render every section.
     * @unofficial
     */
    rerender(full?: boolean): void;

    /**
     * Selects a range within the preview, scrolling its section into view.
     *
     * @param range - The range to select.
     * @unofficial
     */
    selectRange(range: unknown): void;

    /**
     * Sets the preview text and queues a render.
     *
     * @param text - The text to render.
     * @unofficial
     */
    set(text: string): void;

    /**
     * Collapses or expands the lists within an element.
     *
     * @param el - The element containing the lists.
     * @param collapsed - Whether to collapse the lists.
     * @unofficial
     */
    setListCollapse(el: HTMLElement, collapsed: boolean): void;

    /**
     * Ensures a section is shown, updating the virtual display.
     *
     * @param section - The section to show.
     * @unofficial
     */
    showSection(section: unknown): void;

    /**
     * Unfolds all headings in the preview.
     *
     * @unofficial
     */
    unfoldAllHeadings(): void;

    /**
     * Unfolds all lists in the preview.
     *
     * @unofficial
     */
    unfoldAllLists(): void;

    /**
     * Re-measures the footer section.
     *
     * @unofficial
     */
    updateFooter(): void;

    /**
     * Re-measures the header section.
     *
     * @unofficial
     */
    updateHeader(): void;

    /**
     * Recomputes which sections should be shown based on heading-fold levels.
     *
     * @unofficial
     */
    updateShownSections(): void;

    /**
     * Updates the virtually-rendered sections for the current scroll position.
     *
     * @param scrollTop - An optional explicit scroll-top to use.
     * @unofficial
     */
    updateVirtualDisplay(scrollTop?: number): void;
  }

  namespace MarkdownPreviewRenderer {
    /**
     * The currently registered code block post processors.
     *
     * @unofficial
     */
    const codeBlockPostProcessors: Record<string, CodeBlockPostProcessorHandler>;
    /**
     * Create a code block post processor.
     *
     * @param language - The language of the code block.
     * @param handler - The handler of the code block.
     * @returns The code block post processor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link createCodeBlockPostProcessor} instead.
     * @since 0.12.11
     */
    function createCodeBlockPostProcessor__(
      language: string,
      handler: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<unknown> | void
    ): (el: HTMLElement, ctx: MarkdownPostProcessorContext) => void;

    /**
     * Registers the DOM events.
     *
     * @param el - The element to register the events on.
     * @param handlers - The handlers to register.
     * @param childElFn - The function to determine if `childEl` belongs to the `el`.
     *
     * @unofficial
     */
    function registerDomEvents(
      el: HTMLElement,
      handlers: DomEventsHandlers,
      childElFn?: (childEl: HTMLElement) => boolean
    ): void;

    /**
     * Register a post processor.
     *
     * @param postProcessor - The post processor to register.
     * @param sortOrder - The sort order of the post processor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link registerPostProcessor} instead.
     * @since 0.10.12
     */
    function registerPostProcessor__(postProcessor: MarkdownPostProcessor, sortOrder?: number): void;

    /**
     * Remove the code block post processor currently registered with the given language.
     *
     * @param language - The language to unregister the post processor for.
     *
     * @remark Views will not reflect the removal until being re-rendered.
     * @unofficial
     */
    function unregisterCodeBlockPostProcessor(language: string): void;

    /**
     * Unregister a post processor.
     *
     * @param postProcessor - The post processor to unregister.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link unregisterPostProcessor} instead.
     * @since 0.9.7
     */
    function unregisterPostProcessor__(postProcessor: MarkdownPostProcessor): void;
  }
}
