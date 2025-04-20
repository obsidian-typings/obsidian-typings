export {};

declare module 'obsidian' {
    interface ColorComponent extends ValueComponent<string> {
        /**
         * Access the underlying input element of type "color".
         *
         * @unofficial
         */
        colorPickerEl: HTMLInputElement;

        /**
         * The function that's called after changing the value of the component.
         *
         * @remark Using `ColorComponent.onChange(callback)` assigns the callback to this method.
         * @unofficial
         */
        changeCallback?(value: HexString): void;

        /**
         * @unofficial
         */
        getValueInt(): number;

        /**
         * @unofficial
         */
        setValueInt(value: number): this;
    }
}
