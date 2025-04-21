export {};

declare module 'obsidian' {
    /**
     * Represents a autocomplete suggestion in the editor
     *
     * @typeParam T - The type of the suggestion items.
     */
    interface EditorSuggest<T> extends PopoverSuggest<T> {
        /**
         * Current suggestion context, containing the result of `onTrigger`.
         * This will be `null` any time the `EditorSuggest` is not supposed to run.
         *
         * @official
         */
        context: EditorSuggestContext | null;

        /**
         * Override this to use a different limit for suggestion items.
         *
         * @official
         */
        limit: number;

        /**
         * Create a new EditorSuggest.
         *
         * @param app - The app instance.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(app: App): this;

        /**
         * Generate suggestion items based on this context. Can be async, but preferably sync.
         * When generating async suggestions, you should pass the context along.
         *
         * @param context - The context of the suggestion.
         * @returns The suggestion items.
         * @example
         * ```ts
         * class MyEditorSuggest extends EditorSuggest<string> {
         *     public override getSuggestions(context: EditorSuggestContext): string[] {
         *         return ['Item 1', 'Item 2', 'Item 3'];
         *     }
         * }
         * ```
         * @example
         * ```ts
         * class MyEditorSuggest extends EditorSuggest<string> {
         *     public override getSuggestions(context: EditorSuggestContext): Promise<string[]> {
         *         return Promise.resolve(['Item 1', 'Item 2', 'Item 3']);
         *     }
         * }
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getSuggestions} instead.
         */
        getSuggestions__(context: EditorSuggestContext): T[] | Promise<T[]>;

        /**
         * Based on the editor line and cursor position, determine if this EditorSuggest should be triggered at this moment.
         * Typically, you would run a regular expression on the current line text before the cursor.
         * Return `null` to indicate that this editor suggest is not supposed to be triggered.
         *
         * Please be mindful of performance when implementing this function, as it will be triggered very often (on each keypress).
         * Keep it simple, and return `null` as early as possible if you determine that it is not the right time.
         *
         * @param cursor - The cursor position.
         * @param editor - The editor instance.
         * @param file - The file instance.
         * @returns The trigger info or `null` if the suggestion is not supposed to be triggered.
         * @example
         * ```ts
         * class MyEditorSuggest extends EditorSuggest<string> {
         *     public override onTrigger(cursor: EditorPosition, editor: Editor, file: TFile | null): EditorSuggestTriggerInfo | null {
         *         return {
         *             start: cursor,
         *             end: cursor,
         *             query: file?.basename ?? ''
         *         };
         *     }
         * }
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link onTrigger} instead.
         */
        onTrigger__(cursor: EditorPosition, editor: Editor, file: TFile | null): EditorSuggestTriggerInfo | null;

        /**
         * Set the instructions for the suggestion.
         *
         * @param instructions - The instructions for the suggestion.
         * @example
         * ```ts
         * suggest.setInstructions([{ command: '↑↓', purpose: 'Navigate' }]);
         * ```
         * @official
         */
        setInstructions(instructions: Instruction[]): void;

        /**
         * Show suggestions.
         *
         * @unofficial
         */
        showSuggestions(results: SearchResult[]): void;
    }
}
