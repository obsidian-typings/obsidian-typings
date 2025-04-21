export {};

declare module 'obsidian' {
    /**
     * A sub view of the markdown view.
     */
    interface MarkdownSubView {
        /**
         * Apply the scroll position.
         *
         * @param scroll - The scroll position.
         * @example
         * ```ts
         * markdownSubView.applyScroll(100);
         * ```
         * @official
         */
        applyScroll(scroll: number): void;

        /**
         * Get the markdown content.
         *
         * @official
         */
        get(): string;

        /**
         * Get the scroll position.
         *
         * @official
         */
        getScroll(): number;

        /**
         * Set the markdown content.
         *
         * @param data - The markdown content.
         * @param clear - Whether to clear the content before setting it.
         * @example
         * ```ts
         * markdownSubView.set('**foo** bar', true);
         * ```
         * @official
         */
        set(data: string, clear: boolean): void;
    }
}
