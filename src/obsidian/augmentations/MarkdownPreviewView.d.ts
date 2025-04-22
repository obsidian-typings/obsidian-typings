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
         * @todo Documentation incomplete.
         * @unofficial
         */
        search: null | unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        type: 'preview' | string;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        view: MarkdownView;

        /**
         * The file associated with the markdown preview view.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link file} instead.
         */
        get file__(): TFile;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        applyFoldInfo(e: unknown): unknown;

        /**
         * Apply the scroll position to the markdown preview view.
         *
         * @example
         * ```ts
         * markdownPreviewView.applyScroll(100);
         * ```
         * @official
         */
        applyScroll(scroll: number): void;

        /**
         * @todo Documentation incomplete.
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
         * @todo Documentation incomplete.
         * @unofficial
         */
        edit(e: unknown): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        foldAll(): unknown;

        /**
         * Get the markdown content of the markdown preview view.
         *
         * @official
         */
        get(): string;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        getEphemeralState(e: unknown): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        getFoldInfo(): unknown;

        /**
         * Get the scroll position of the markdown preview view.
         *
         * @official
         */
        getScroll(): number;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        getSelection(): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        hide(): void;

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
        onResize(): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onScroll(): unknown;

        /**
         * @todo Documentation incomplete.
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
         * @todo Documentation incomplete.
         * @unofficial
         */
        setEphemeralState(e: unknown): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        show(): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        showSearch(): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        unfoldAll(): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        updateOptions(): unknown;
    }
}
