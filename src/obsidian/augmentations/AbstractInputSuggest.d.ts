export {};

declare module 'obsidian' {
    /**
     * Attach to an `<input>` element or a `<div contentEditable>` to add type-ahead
     * support.
     *
     * @typeParam T - The type of the suggestion items.
     */
    interface AbstractInputSuggest<T> extends PopoverSuggest<T> {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        lastRect: DOMRect;

        /**
         * Limit to the number of elements rendered at once. Set to 0 to disable. Defaults to 100.
         *
         * @official
         */
        limit: number;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        textInputEl: HTMLInputElement | HTMLDivElement;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        autoReposition(): void;

        /**
         * Accepts an `<input>` text box or a contenteditable div.
         *
         * @param app - The app instance.
         * @param textInputEl - The text input element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__2(app: App, textInputEl: HTMLInputElement | HTMLDivElement): this;

        /**
         * Gets the suggestions for the input element.
         *
         * @param query - The query to get suggestions for.
         * @returns The suggestions for the input element.
         * @example
         * ```ts
         * class MyInputSuggest extends AbstractInputSuggest<string> {
         *     protected override getSuggestions(query: string): string[] {
         *         return ['foo', 'bar'];
         *     }
         * }
         * ```
         * @example
         * ```ts
         * class MyInputSuggest extends AbstractInputSuggest<string> {
         *     protected override async getSuggestions(query: string): Promise<string[]> {
         *         return await Promise.resolve(['foo', 'bar']);
         *     }
         * }
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getSuggestions} instead.
         */
        getSuggestions__(query: string): T[] | Promise<T[]>;

        /**
         * Gets the value from the input element.
         *
         * @returns The value from the input element.
         * @official
         */
        getValue(): string;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onInputChange(): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onInputFocus(): void;

        /**
         * Registers a callback to handle when a suggestion is selected by the user.
         *
         * @param callback - The callback to handle when a suggestion is selected by the user.
         * @returns The input suggest instance.
         * @example
         * ```ts
         * inputSuggest.onSelect((value, evt) => {
         *     console.log(value, evt);
         * });
         * ```
         * @official
         */
        onSelect(callback: (value: T, evt: MouseEvent | KeyboardEvent) => unknown): this;

        /**
         * Callback for
         *
         * @param value - The value of the suggestion.
         * @param evt - The event that occurred.
         * @returns The result of the callback.
         *
         * @unofficial
         */
        selectCb?(value: T, evt: MouseEvent | KeyboardEvent): unknown;

        /**
         * Sets the value into the input element.
         *
         * @param value - The value to set.
         * @example
         * ```ts
         * inputSuggest.setValue('foo');
         * ```
         * @official
         */
        setValue(value: string): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        showSuggestions(suggestions: SearchResult[]): void;
    }
}
