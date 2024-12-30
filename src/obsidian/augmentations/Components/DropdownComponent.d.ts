export {};

declare module 'obsidian' {
    interface DropdownComponent extends ValueComponent<string> {
        /**
         * The function that's called after changing the value of the component.
         * @remark Using `DropdownComponent.onChange(callback)` assigns the callback to this method
         */
        changeCallback?: (value: string) => void;
    }
}
