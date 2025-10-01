export {};

declare module 'obsidian' {
    /**
     * Color picker component. Values are by default 6-digit hash-prefixed hex strings like `#000000`.
     * @since 1.0.0
     */
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
         * Create a new color picker component.
         *
         * @param containerEl - The container element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;

        /**
         * Get the current value of the color picker.
         *
         * @returns The current value of the color picker.
         * @official
         * @since 1.0.0
         */
        getValue(): HexString;

        /**
         * Get the current value of the color picker as an HSL object.
         *
         * @returns The current value of the color picker as an HSL object.
         * @official
         * @since 1.0.0
         */
        getValueHsl(): HSL;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        getValueInt(): number;

        /**
         * Get the current value of the color picker as an RGB object.
         *
         * @returns The current value of the color picker as an RGB object.
         * @official
         * @since 1.0.0
         */
        getValueRgb(): RGB;

        /**
         * Set the callback to be called when the color picker value changes.
         *
         * @param callback - The callback to be called when the color picker value changes.
         * @returns The color picker.
         * @example
         * ```ts
         * colorPicker.onChange((value) => {
         *     console.log(value);
         * });
         * ```
         * @official
         * @since 1.0.0
         */
        onChange(callback: (value: string) => any): this;

        /**
         * Disable the color picker.
         *
         * @param disabled - Whether to disable the color picker.
         * @example
         * ```ts
         * colorPicker.setDisabled(true);
         * ```
         * @official
         * @since 1.2.3
         */
        setDisabled(disabled: boolean): this;

        /**
         * Set the current value of the color picker.
         *
         * @param value - The value to set the color picker to.
         * @returns The color picker.
         * @example
         * ```ts
         * colorPicker.setValue('#000000');
         * ```
         * @official
         * @since 1.0.0
         */
        setValue(value: HexString): this;

        /**
         * Set the current value of the color picker as an HSL object.
         *
         * @param hsl - The HSL object to set the color picker to.
         * @returns The color picker.
         * @example
         * ```ts
         * colorPicker.setValueHsl({ h: 0, s: 0, l: 0 });
         * ```
         * @official
         * @since 1.0.0
         */
        setValueHsl(hsl: HSL): this;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        setValueInt(value: number): this;

        /**
         * Set the current value of the color picker as an RGB object.
         *
         * @param rgb - The RGB object to set the color picker to.
         * @returns The color picker.
         * @example
         * ```ts
         * colorPicker.setValueRgb({ r: 0, g: 0, b: 0 });
         * ```
         * @official
         * @since 1.0.0
         */
        setValueRgb(rgb: RGB): this;
    }
}
