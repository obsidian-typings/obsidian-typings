export {};

declare module 'obsidian' {
    /**
     * Represents a selection or caret in the editor
     */
    interface EditorSelectionOrCaret {
        /**
         * The selection start position.
         *
         * @official
         */
        anchor: EditorPosition;

        /**
         * The selection end position. If not provided, the caret is used.
         *
         * @official
         */
        head?: EditorPosition;
    }
}
