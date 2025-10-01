export {};

declare module 'obsidian' {
    /**
     * Dropdown component
     * @since 0.9.7
     */
    interface DropdownComponent extends ValueComponent<string> {
        /**
         * The HTML element representation of the dropdown.
         *
         * @official
         * @since 0.9.7
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
         * @since 0.9.7
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
         * @since 0.9.7
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
         * @since 0.9.7
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
         * @since 0.9.7
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
         * @since 1.2.3
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
         * @since 0.9.7
         */
        setValue(value: string): this;
    }
}
