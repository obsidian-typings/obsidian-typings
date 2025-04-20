export {};

declare module 'obsidian' {
    interface SearchComponent extends AbstractTextComponent<HTMLInputElement> {
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
         * Adds a class to the search component.
         *
         * @unofficial
         */
        setClass(cls: string): this;
    }
}
