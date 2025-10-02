export {};

declare module 'obsidian' {
    /**
     * A search component.
     * @since 0.9.21
     */
    interface SearchComponent extends AbstractTextComponent<HTMLInputElement> {
        /**
         * The HTML element for the clear button.
         *
         * @official
         * @since 0.9.21
         */
        clearButtonEl: HTMLElement;

        /**
         * The containing element for the component's `clearButtonEl` and `inputEl`.
         *
         * @unofficial
         */
        containerEl: HTMLElement;

        /**
         * Adds a decorator to the right side of the search component.
         *
         * @unofficial
         */
        addRightDecorator(decoratorFn: (containerEl: HTMLElement) => void): this;

        /**
         * Create a new search component.
         *
         * @param containerEl - The container element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;

        /**
         * Called when the search component's value changes.
         *
         * @official
         */
        onChanged(): void;

        /**
         * Adds a class to the search component.
         *
         * @unofficial
         */
        setClass(cls: string): this;
    }
}
