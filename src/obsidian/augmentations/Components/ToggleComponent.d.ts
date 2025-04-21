export {};

declare module 'obsidian' {
    /**
     * A toggle component.
     */
    interface ToggleComponent extends ValueComponent<boolean> {
        /**
         * The HTML element that represents the toggle.
         *
         * @official
         */
        toggleEl: HTMLElement;

        /**
         * The function that's called after changing the value of the component.
         *
         * @remark Using `ToggleComponent.onChange(callback)` assigns the callback to this method.
         * @unofficial
         */
        changeCallback?(value: boolean): void;

        /**
         * Create a new toggle component.
         *
         * @param containerEl - The container element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;

        /**
         * Get the value of the toggle.
         *
         * @returns The value of the toggle.
         * @official
         */
        getValue(): boolean;

        /**
         * Handle the change event of the toggle.
         *
         * @param callback - The callback to handle the change event.
         * @returns The toggle.
         * @example
         * ```ts
         * toggle.onChange((value) => {
         *     console.log(value);
         * });
         * ```
         * @official
         */
        onChange(callback: (value: boolean) => any): this;

        /**
         * Handle the click event of the toggle.
         *
         * @official
         */
        onClick(): void;

        /**
         * Disable the toggle.
         *
         * @param disabled - Whether to disable the toggle.
         * @returns The toggle.
         * @example
         * ```ts
         * toggle.setDisabled(true);
         * ```
         * @official
         */
        setDisabled(disabled: boolean): this;

        /**
         * Set the tooltip of the toggle.
         *
         * @param tooltip - The tooltip text to show.
         * @param options - The options for the tooltip.
         * @returns The toggle.
         * @official
         */
        setTooltip(tooltip: string, options?: TooltipOptions): this;

        /**
         * Set the value of the toggle.
         *
         * @param on - Whether the toggle is on.
         * @returns The toggle.
         * @example
         * ```ts
         * toggle.setValue(true);
         * ```
         * @official
         */
        setValue(on: boolean): this;
    }
}
