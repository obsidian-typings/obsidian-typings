export {};

declare module 'obsidian' {
    /**
     * Represents a range or caret in the editor
     * @since 0.12.11
     */
    interface EditorRangeOrCaret {
        /**
         * The start position.
         *
         * @official
         */
        from: EditorPosition;

        /**
         * The end position. If not provided, the caret is used.
         *
         * @official
         */
        to?: EditorPosition;
    }
}
