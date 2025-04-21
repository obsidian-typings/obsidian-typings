export {};

declare module 'obsidian' {
    /**
     * Represents a change to the editor
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
