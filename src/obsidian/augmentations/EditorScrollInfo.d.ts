export {};

declare module 'obsidian' {
    /**
     * Scroll info for the editor
     * @since 0.15.0
     */
    interface EditorScrollInfo {
        /**
         * The width of the editor.
         *
         * @official
         */
        clientWidth: number;

        /**
         * The height of the editor.
         *
         * @official
         */
        height: number;

        /**
         * The horizontal scroll position.
         *
         * @official
         */
        left: number;

        /**
         * The vertical scroll position.
         *
         * @official
         */
        top: number;
    }
}
