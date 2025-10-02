export {};

declare module 'obsidian' {
    /**
     * Represents a range in the editor
     * @since 0.12.11
     */
    interface EditorRange {
        /**
         * The start position.
         *
         * @official
         */
        from: EditorPosition;

        /**
         * The end position.
         *
         * @official
         */
        to: EditorPosition;
    }
}
