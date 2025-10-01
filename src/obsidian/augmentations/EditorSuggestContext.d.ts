export {};

declare module 'obsidian' {
    /**
     * The context of the suggestion
     * @since 0.12.17
     */
    interface EditorSuggestContext extends EditorSuggestTriggerInfo {
        /**
         * The editor instance.
         *
         * @official
         */
        editor: Editor;

        /**
         * The file instance.
         *
         * @official
         */
        file: TFile;
    }
}
