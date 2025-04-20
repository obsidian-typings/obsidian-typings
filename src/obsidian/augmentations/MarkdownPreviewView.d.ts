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

        /** @unofficial */
        search: null | unknown;

        /** @unofficial */
        type: 'preview' | string;

        /** @unofficial */
        view: MarkdownView;

        /** @unofficial */
        applyFoldInfo(e: unknown): unknown;

        /** @unofficial */
        beforeUnload(): unknown;

        /**
         * Clears the rendered preview.
         *
         * @unofficial
         */
        clear(): unknown;

        /** @unofficial */
        edit(e: unknown): unknown;

        /** @unofficial */
        foldAll(): unknown;

        /**
         * Returns the renderer text.
         *
         * @unofficial
         */
        get(): string;

        /** @unofficial */
        getEphemeralState(e: unknown): unknown;

        /** @unofficial */
        getFoldInfo(): unknown;

        /** @unofficial */
        getSelection(): unknown;

        /** @unofficial */
        hide(): void;

        /** @unofficial */
        onFoldChange(): unknown;

        /** @unofficial */
        onResize(): unknown;

        /** @unofficial */
        onScroll(): unknown;

        /** @unofficial */
        requestUpdateLinks(): unknown;

        /**
         * Set the Preview to new data.
         *
         * @param data The data to set the renderer to.
         * @param clear If the preview should be cleared.
         * @unofficial
         */
        set(data: string, clear: boolean): void;

        /** @unofficial */
        setEphemeralState(e: unknown): unknown;

        /** @unofficial */
        show(): void;

        /** @unofficial */
        showSearch(): unknown;

        /** @unofficial */
        unfoldAll(): unknown;

        /** @unofficial */
        updateOptions(): unknown;
    }
}
