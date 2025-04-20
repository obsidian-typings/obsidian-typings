import type { ReadViewRenderer } from '../internals/ReadViewRenderer.d.ts';

export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface MarkdownPreviewView extends MarkdownRenderer, MarkdownSubView, MarkdownPreviewEvents {
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
         * @todo Documentation incomplete.
         * @unofficial
         */
        applyFoldInfo(e: unknown): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        beforeUnload(): unknown;

        /**
         * Clears the rendered preview.
         *
         * @unofficial
         */
        clear(): unknown;

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
         * Returns the renderer text.
         *
         * @unofficial
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
         * Set the Preview to new data.
         *
         * @param data The data to set the renderer to.
         * @param clear If the preview should be cleared.
         * @unofficial
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
