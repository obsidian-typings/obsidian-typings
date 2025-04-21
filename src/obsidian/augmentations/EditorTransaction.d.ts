export {};

declare module 'obsidian' {
    /**
     * Transaction for the editor
     */
    interface EditorTransaction {
        /**
         * The changes to the editor.
         *
         * @official
         */
        changes?: EditorChange[];

        /**
         * The replacement text.
         *
         * @official
         */
        replaceSelection?: string;

        /**
         * The main selection.
         *
         * @official
         */
        selection?: EditorRangeOrCaret;

        /**
         * List of selections for multiple cursors.
         *
         * @official
         */
        selections?: EditorRangeOrCaret[];
    }
}
