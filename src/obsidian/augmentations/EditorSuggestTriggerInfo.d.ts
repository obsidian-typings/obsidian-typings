export {};

declare module 'obsidian' {
    /**
     * The trigger info for the suggestion
     */
    interface EditorSuggestTriggerInfo {
        /**
         * The end position of the triggering text. This is used to position the popover.
         *
         * @official
         */
        end: EditorPosition;

        /**
         * They query string (usually the text between start and end) that will be used to generate the suggestion content.
         *
         * @official
         */
        query: string;

        /**
         * The start position of the triggering text. This is used to position the popover.
         *
         * @official
         */
        start: EditorPosition;
    }
}
