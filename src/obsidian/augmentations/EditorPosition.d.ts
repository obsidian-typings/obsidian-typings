export {};

declare module 'obsidian' {
    /**
     * Represents a position in the editor
     * @since 0.12.11
     */
    interface EditorPosition {
        /**
         * The character index (0-based).
         *
         * @official
         */
        ch: number;

        /**
         * The line number (0-based).
         *
         * @official
         */
        line: number;
    }
}
