export {};

declare module 'obsidian' {
    /**
     * Represents a range or caret in the editor
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
