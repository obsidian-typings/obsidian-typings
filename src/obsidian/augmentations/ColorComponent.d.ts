export {};

declare module 'obsidian' {
    interface ColorComponent extends ValueComponent<string> {
        /**
         * Access the underlying input element of type "color"
         */
        colorPickerEl: HTMLInputElement;

        getValueInt(): number;
        setValueInt(value: number): this;
    }
}
