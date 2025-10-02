export {};

declare module 'obsidian' {
    /**
     * Represents a selection in the editor
     * @since 0.12.11
     */
    interface EditorSelection {
        /**
         * The selection start position.
         *
         * @official
         */
        anchor: EditorPosition;

        /**
         * The selection end position.
         *
         * @official
         */
        head: EditorPosition;
    }
}
