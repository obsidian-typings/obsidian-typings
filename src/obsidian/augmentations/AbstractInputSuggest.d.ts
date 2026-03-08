export {};

declare module 'obsidian' {
    /**
     * Attach to an `<input>` element or a `<div contentEditable>` to add type-ahead
     * support.
     *
     * @typeParam T - The type of the suggestion items.
     * @since 1.4.10
     */
    interface AbstractInputSuggest<T> extends PopoverSuggest<T> {
        /**
         * The last bounding rectangle used for positioning the suggestion popover.
         * @unofficial
         */
        lastRect: DOMRect;

        /**
         * Limit to the number of elements rendered at once. Set to 0 to disable. Defaults to 100.
         *
         * @official
         * @since 1.4.10
         */
        limit: number;

        /**
         * The text input element this suggest is attached to.
         * @unofficial
         */
        textInputEl: HTMLInputElement | HTMLDivElement;

        /**
         * Automatically reposition the suggestion popover based on the input element.
         * @unofficial
         */
        autoReposition(): void;

        /**
         * Accepts an `<input>` text box or a contenteditable div.
         *
         * @param app - The app instance.
         * @param textInputEl - The text input element.
         * @returns The abstract input suggest instance.
         * To extract the constructor type, use `ExtractConstructor<AbstractInputSuggest>`.
         * @official
         */
        constructor2__(app: App, textInputEl: HTMLInputElement | HTMLDivElement): this;

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
         * @since 1.5.7
         */
        getSuggestions__(query: string): T[] | Promise<T[]>;

        /**
         * Gets the value from the input element.
         *
         * @returns The value from the input element.
         * @official
         * @since 1.4.10
         */
        getValue(): string;

        /**
         * Handle changes to the input element's value.
         * @unofficial
         */
        onInputChange(): void;

        /**
         * Handle the input element receiving focus.
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
         * @since 1.4.10
         */
        onSelect(callback: (value: T, evt: MouseEvent | KeyboardEvent) => unknown): this;

        /**
         * Callback for selecting a suggestion.
         *
         * @param value - The value of the suggestion.
         * @param evt - The event that occurred.
         * @returns The result of the callback.
         * @unofficial
         */
        selectCb?(value: T, evt: MouseEvent | KeyboardEvent): unknown;

        /**
         * Select a suggestion.
         *
         * @param value - The value of the suggestion.
         * @param evt - The event that occurred.
         * @example
         * ```ts
         * inputSuggest.selectSuggestion('foo', new MouseEvent('click'));
         * ```
         * @official
         * @since 1.6.6
         */
        selectSuggestion(value: T, evt: MouseEvent | KeyboardEvent): void;

        /**
         * Sets the value into the input element.
         *
         * @param value - The value to set.
         * @example
         * ```ts
         * inputSuggest.setValue('foo');
         * ```
         * @official
         * @since 1.4.10
         */
        setValue(value: string): void;

        /**
         * Display the given search results as suggestions.
         *
         * @param suggestions - The search results to display.
         * @unofficial
         */
        showSuggestions(suggestions: SearchResult[]): void;
    }
}
