export {};

declare module 'obsidian' {
    /**
     * A component that allows you to format dates using `Moment.js`.
     * @since 0.9.7
     */
    interface MomentFormatComponent extends TextComponent {
        /**
         * The HTML element that represents the sample value.
         *
         * @official
         * @since 0.9.7
         */
        sampleEl: HTMLElement;

        /**
         * Called when the value of the component changes.
         *
         * @official
         * @since 0.9.7
         */
        onChanged(): void;

        /**
         * Sets the default format when input is cleared. Also used for placeholder.
         *
         * @param defaultFormat - The default format.
         * @returns The component instance.
         * @example
         * ```ts
         * momentFormatComponent.setDefaultFormat('YYYY-MM-DD');
         * ```
         * @official
         * @since 0.9.7
         */
        setDefaultFormat(defaultFormat: string): this;

        /**
         * Sets the sample HTML element.
         *
         * @param sampleEl - The sample HTML element.
         * @returns The component instance.
         * @example
         * ```ts
         * momentFormatComponent.setSampleEl(createEl('strong'));
         * ```
         * @official
         * @since 0.9.7
         */
        setSampleEl(sampleEl: HTMLElement): this;

        /**
         * Sets the value of the component.
         *
         * @param value - The value of the component.
         * @returns The component instance.
         * @example
         * ```ts
         * momentFormatComponent.setValue('2025-01-01');
         * ```
         * @official
         * @since 0.9.7
         */
        setValue(value: string): this;

        /**
         * Updates the sample value.
         *
         * @official
         * @since 0.9.7
         */
        updateSample(): void;
    }
}
