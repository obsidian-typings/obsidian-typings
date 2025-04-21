export {};

declare module 'obsidian' {
    /**
     * Represents a range in the editor
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
