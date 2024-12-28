export {};

declare module 'obsidian' {
    interface SearchComponent extends AbstractTextComponent<HTMLInputElement> {
        /**
         * The function that's called after using `SearchComponent.setValue(value)`
         * @remark Using `SearchComponent.onChange(callback)` assigns the callback to this method
         */
        changeCallback: (value: string) => void;

        /**
         * The containing element for the component's `clearButtonEl` and `inputEl`
         */
        containerEl: HTMLElement;
    }
}
