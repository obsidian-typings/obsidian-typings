export {};

declare module 'obsidian' {
    /**
     * Dropdown component
     */
    interface DropdownComponent extends ValueComponent<string> {
        /**
         * The HTML element representation of the dropdown.
         *
         * @official
         */
        selectEl: HTMLSelectElement;

        /**
         * Add an option to the dropdown.
         *
         * @param value - The value of the option.
         * @param display - The display of the option.
         * @returns The dropdown component.
         * @example
         * ```ts
         * dropdown.addOption('foo', 'bar');
         * ```
         * @official
         */
        addOption(value: string, display: string): this;

        /**
         * Add multiple options to the dropdown.
         *
         * @param options - The options to add.
         * @returns The dropdown component.
         * @example
         * ```ts
         * dropdown.addOptions({ foo: 'bar', baz: 'qux' });
         * ```
         * @official
         */
        addOptions(options: Record<string, string>): this;

        /**
         * The function that's called after changing the value of the component.
         *
         * @remark Using `DropdownComponent.onChange(callback)` assigns the callback to this method.
         * @unofficial
         */
        changeCallback?(value: string): void;

        /**
         * Create a dropdown component.
         *
         * @param containerEl - The container element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;

        /**
         * Get the selected value of the dropdown.
         *
         * @returns The selected value of the dropdown.
         * @official
         */
        getValue(): string;

        /**
         * Set the callback function to be called when the dropdown value changes.
         *
         * @param callback - The callback function.
         * @returns The dropdown component.
         * @example
         * ```ts
         * dropdown.onChange((value) => console.log(value));
         * ```
         * @official
         */
        onChange(callback: (value: string) => any): this;

        /**
         * Set the disabled state of the dropdown.
         *
         * @param disabled - Whether the dropdown is disabled.
         * @returns The dropdown component.
         * @example
         * ```ts
         * dropdown.setDisabled(true);
         * ```
         * @official
         */
        setDisabled(disabled: boolean): this;

        /**
         * Set the selected value of the dropdown.
         *
         * @param value - The value to set.
         * @returns The dropdown component.
         * @example
         * ```ts
         * dropdown.setValue('foo');
         * ```
         * @official
         */
        setValue(value: string): this;
    }
}
