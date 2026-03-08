import type { ReadViewRenderer } from '../internals/ReadViewRenderer.d.ts';

export {};

declare module 'obsidian' {
    /**
     * The markdown preview view.
     */
    interface MarkdownPreviewView extends MarkdownRenderer, MarkdownSubView, MarkdownPreviewEvents {
        /**
         * The container element of the markdown preview view.
         *
         * @official
         */
        containerEl: HTMLElement;

        /**
         * Unique identifier for the rendered element.
         *
         * @unofficial
         */
        docId: string;

        /**
         * HTML renderer for the Markdown.
         *
         * @unofficial
         */
        renderer: ReadViewRenderer;

        /**
         * Search instance for in-document search, or `null` if inactive.
         * @unofficial
         */
        search: null | unknown;

        /**
         * The subview type identifier (e.g. 'preview').
         * @unofficial
         */
        type: 'preview' | string;

        /**
         * The parent MarkdownView containing this preview.
         * @unofficial
         */
        view: MarkdownView;

        /**
         * Apply fold information to the preview.
         *
         * @param e - The fold information to apply.
         * @returns The result of applying fold information.
         * To get the constructor, use `getMarkdownPreviewViewConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         */
        applyFoldInfo(e: unknown): unknown;

        /**
         * Apply the scroll position to the markdown preview view.
         *
         * @param scroll - The scroll position to apply.
         * @example
         * ```ts
         * markdownPreviewView.applyScroll(100);
         * ```
         * @official
         */
        applyScroll(scroll: number): void;

        /**
         * Perform cleanup before the preview is unloaded.
         *
         * @returns The result of the cleanup.
         * @unofficial
         */
        beforeUnload(): unknown;

        /**
         * Clear the markdown content of the markdown preview view.
         *
         * @example
         * ```ts
         * markdownPreviewView.clear();
         * ```
         * @official
         */
        clear(): void;

        /**
         * Constructor.
         *
         * @param containerEl - The containerEl.
         * @returns The new instance.
         * @unofficial
         */
        constructor__(containerEl: HTMLElement): this;

        /**
         * Switch to edit mode for the given element or selection.
         *
         * @param e - The element or selection to edit.
         * @returns The result of switching to edit mode.
         * @unofficial
         */
        edit(e: unknown): unknown;

        /**
         * The file associated with the markdown preview view.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link file} instead.
         */
        file__?(): TFile;

        /**
         * Fold all foldable sections in the preview.
         *
         * @returns The result of folding all sections.
         * @unofficial
         */
        foldAll(): unknown;

        /**
         * Get the markdown content of the markdown preview view.
         *
         * @returns The markdown content.
         * @official
         */
        get(): string;

        /**
         * Get the ephemeral state of the preview (e.g. scroll position).
         *
         * @param e - The state context.
         * @returns The ephemeral state.
         * @unofficial
         */
        getEphemeralState(e: unknown): unknown;

        /**
         * Get the current fold state information.
         *
         * @returns The fold state information.
         * @unofficial
         */
        getFoldInfo(): unknown;

        /**
         * Get the scroll position of the markdown preview view.
         *
         * @returns The scroll position.
         * @official
         */
        getScroll(): number;

        /**
         * Get the current text selection in the preview.
         *
         * @returns The current text selection.
         * @unofficial
         */
        getSelection(): unknown;

        /**
         * Hide the preview view.
         * @unofficial
         */
        hide(): void;

        /**
         * Handle a fold state change in the preview.
         *
         * @returns The result of the fold change handling.
         * @unofficial
         */
        onFoldChange(): unknown;

        /**
         * Called when the preview view is loaded.
         * @unofficial
         */
        onload(): void;

        /**
         * Handle a resize event on the preview view.
         *
         * @returns The result of the resize handling.
         * @unofficial
         */
        onResize(): unknown;

        /**
         * Handle a scroll event on the preview view.
         *
         * @returns The result of the scroll handling.
         * @unofficial
         */
        onScroll(): unknown;

        /**
         * Request an update of rendered links in the preview.
         *
         * @returns The result of the link update request.
         * @unofficial
         */
        requestUpdateLinks(): unknown;

        /**
         * Force the markdown preview view to rerender.
         *
         * @param full - Whether to rerender the entire preview or just the changed parts.
         * @example
         * ```ts
         * markdownPreviewView.rerender(true);
         * ```
         * @official
         */
        rerender(full?: boolean): void;

        /**
         * Set the markdown content of the markdown preview view.
         *
         * @param data - The markdown content.
         * @param clear - Whether to clear the content before setting it.
         * @example
         * ```ts
         * markdownPreviewView.set('**foo** bar', true);
         * ```
         * @official
         */
        set(data: string, clear: boolean): void;

        /**
         * Set the ephemeral state of the preview (e.g. scroll position).
         *
         * @param e - The ephemeral state to set.
         * @returns The result of setting the ephemeral state.
         * @unofficial
         */
        setEphemeralState(e: unknown): unknown;

        /**
         * Show the preview view.
         * @unofficial
         */
        show(): void;

        /**
         * Show the in-document search bar.
         *
         * @returns The result of showing the search bar.
         * @unofficial
         */
        showSearch(): unknown;

        /**
         * Unfold all folded sections in the preview.
         *
         * @returns The result of unfolding all sections.
         * @unofficial
         */
        unfoldAll(): unknown;
    
        /**
         * Update the rendering options of the preview.
         *
         * @returns The result of updating the options.
         * @unofficial
         */
        updateOptions(): unknown;
}
}
