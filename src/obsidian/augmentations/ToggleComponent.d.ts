export {};

declare module 'obsidian' {
    interface ToggleComponent extends ValueComponent<boolean> {
        /**
         * The function that's called after changing the value of the component.
         * @remark Using `ToggleComponent.onChange(callback)` assigns the callback to this method
         */
        changeCallback?: (value: boolean) => void;
    }
}
