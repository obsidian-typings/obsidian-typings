export {};

declare module 'obsidian' {
    /**
     * Suggest modal for fuzzy search.
     *
     * @typeParam T - The type of the item that was searched for.
     */
    interface FuzzySuggestModal<T> extends SuggestModal<FuzzyMatch<T>> {
        /**
         * Get the items to be used in the fuzzy search.
         *
         * @returns the items to be used in the fuzzy search.
         * @example
         * ```ts
         * class MyFuzzySuggestModal extends FuzzySuggestModal<string> {
         *     public override getItems(): string[] {
         *         return ['foo', 'bar', 'baz'];
         *     }
         * }
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getItems} instead.
         */
        getItems__(): T[];

        /**
         * Get the text to be used in the fuzzy search.
         *
         * @param item - The item to get the text for.
         * @returns The text to be displayed in the suggestion.
         * @example
         * ```ts
         * class MyFuzzySuggestModal extends FuzzySuggestModal<string> {
         *     public override getItemText(item: string): string {
         *         return `--- ${item} ---`;
         *     }
         * }
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getItemText} instead.
         */
        getItemText__(item: T): string;

        /**
         * Get the suggestions for the fuzzy match.
         *
         * @param query - The query to search for.
         * @returns The suggestions for the fuzzy match.
         * @example
         * ```ts
         * class MyFuzzySuggestModal extends FuzzySuggestModal<string> {
         *     public override getSuggestions(query: string): FuzzyMatch<string>[] {
         *         return [{ item: 'foo' + query, match: { score: 1, matches: [[0, 3]] } }];
         *     }
         * }
         * ```
         * @official
         */
        getSuggestions(query: string): FuzzyMatch<T>[];

        /**
         * Called when an item is chosen.
         *
         * @param item - The item that was chosen.
         * @param evt - The event that occurred.
         * @example
         * ```ts
         * class MyFuzzySuggestModal extends FuzzySuggestModal<string> {
         *     public override onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
         *         console.log(item);
         *     }
         * }
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link onChooseSuggestion} instead.
         */
        onChooseItem__(item: T, evt: MouseEvent | KeyboardEvent): void;

        /**
         * Called when a suggestion is chosen.
         *
         * @param item - The item that was chosen.
         * @param evt - The event that occurred.
         * @example
         * ```ts
         * class MyFuzzySuggestModal extends FuzzySuggestModal<string> {
         *     public override onChooseSuggestion(item: FuzzyMatch<string>, evt: MouseEvent | KeyboardEvent): void {
         *         console.log(item);
         *     }
         * }
         * ```
         * @official
         */
        onChooseSuggestion(item: FuzzyMatch<T>, evt: MouseEvent | KeyboardEvent): void;

        /**
         * Render the suggestion.
         *
         * @param item - The item to render.
         * @param el - The element to render the suggestion to.
         * @example
         * ```ts
         * class MyFuzzySuggestModal extends FuzzySuggestModal<string> {
         *     public override renderSuggestion(item: FuzzyMatch<string>, el: HTMLElement): void {
         *         el.createEl('strong', { text: item.item });
         *     }
         * }
         * ```
         * @official
         */
        renderSuggestion(item: FuzzyMatch<T>, el: HTMLElement): void;
    }
}
