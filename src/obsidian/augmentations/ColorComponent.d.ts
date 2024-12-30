export {};

declare module 'obsidian' {
    interface ColorComponent extends ValueComponent<string> {
        /**
         * The function that's called after changing the value of the component.
         * @remark Using `ColorComponent.onChange(callback)` assigns the callback to this method
         */
        changeCallback?: (value: HexString) => void;
        /**
         * Access the underlying input element of type "color"
         */
        colorPickerEl: HTMLInputElement;

        getValueInt(): number;
        setValueInt(value: number): this;
    }
}
