export {};

declare module 'obsidian' {
    /**
     * Component for a text input or text area.
     *
     * @typeParam T - The type of the input element.
     * @since 0.9.21
     */
    interface AbstractTextComponent<T extends HTMLInputElement | HTMLTextAreaElement> extends ValueComponent<string> {
        /**
         * The input element.
         *
         * @official
         * @since 0.9.7
         */
        inputEl: T;

        /**
         * The function that's called after changing the value of the component.
         *
         * @remark Using `AbstractTextComponent.onChange(callback)` assigns the callback to this method.
         * @unofficial
         */
        changeCallback?(value: string): void;

        /**
         * Creates a new text component.
         *
         * @param inputEl - The input element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(inputEl: T): this;

        /**
         * Gets the value of the input element.
         *
         * @returns The value of the input element.
         * @official
         * @since 0.9.7
         */
        getValue(): string;

        /**
         * Sets the callback to handle when the value of the input element changes.
         *
         * @param callback - The callback to handle when the value of the input element changes.
         * @returns The text component.
         * @example
         * ```ts
         * textComponent.onChange((value) => {
         *     console.log(value);
         * });
         * ```
         * @official
         * @since 0.9.7
         */
        onChange(callback: (value: string) => any): this;

        /**
         * Manually invokes the callback registered with `onChange`.
         *
         * @official
         * @since 0.9.21
         */
        onChanged(): void;

        /**
         * Sets the disabled state of the input element.
         *
         * @param disabled - Whether to disable the input element.
         * @returns The text component.
         * @example
         * ```ts
         * textComponent.setDisabled(true);
         * ```
         * @official
         * @since 1.2.3
         */
        setDisabled(disabled: boolean): this;

        /**
         * Sets the placeholder of the input element.
         *
         * @param placeholder - The placeholder to set.
         * @returns The text component.
         * @example
         * ```ts
         * textComponent.setPlaceholder('foo');
         * ```
         * @official
         * @since 0.9.7
         */
        setPlaceholder(placeholder: string): this;

        /**
         * Sets the value of the input element.
         *
         * @param value - The value to set.
         * @returns The text component.
         * @example
         * ```ts
         * textComponent.setValue('foo');
         * ```
         * @official
         * @since 0.9.7
         */
        setValue(value: string): this;
    }
}
