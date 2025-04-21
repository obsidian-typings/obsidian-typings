export {};

declare module 'obsidian' {
    /**
     * The context of the suggestion
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
