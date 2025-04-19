export {};

declare module 'obsidian' {
    interface AbstractTextComponent<T extends HTMLInputElement | HTMLTextAreaElement> extends ValueComponent<string> {
        /**
         * The function that's called after changing the value of the component.
         * @remark Using `AbstractTextComponent.onChange(callback)` assigns the callback to this method
         */
        changeCallback?(value: string): void;
    }
}
