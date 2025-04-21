export {};

declare module 'obsidian' {
    /**
     * An owner that controls UI suggestions.
     *
     * @typeParam T - The type of the suggestion items.
     */
    interface ISuggestOwner<T> {
        /**
         * Render the suggestion item into DOM.
         *
         * @param value - The value of the suggestion.
         * @param el - The DOM element to render the suggestion into.
         * @example
         * ```ts
         * class MySuggestOwner implements ISuggestOwner<string> {
         *     public renderSuggestion(value: string, el: HTMLElement): void {
         *         el.createEl('strong', { text: value });
         *     }
         * }
         * ```
         * @official
         */
        renderSuggestion(value: T, el: HTMLElement): void;

        /**
         * Called when the user makes a selection.
         *
         * @param value - The value of the suggestion.
         * @param evt - The event that triggered the selection.
         * @example
         * ```ts
         * class MySuggestOwner implements ISuggestOwner<string> {
         *     public selectSuggestion(value: string, evt: MouseEvent | KeyboardEvent): void {
         *         console.log(value, evt);
         *     }
         * }
         * ```
         * @official
         */
        selectSuggestion(value: T, evt: MouseEvent | KeyboardEvent): void;
    }
}
