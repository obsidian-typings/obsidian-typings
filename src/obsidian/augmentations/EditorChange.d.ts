export {};

declare module 'obsidian' {
    /**
     * Represents a change to the editor
     * @since 0.12.11
     */
    interface EditorChange extends EditorRangeOrCaret {
        /**
         * The text to replace the range with.
         *
         * @official
         */
        text: string;
    }
}
