export {};

declare module 'obsidian' {
    /**
     * A button component.
     */
    interface ButtonComponent extends BaseComponent {
        /**
         * The HTML element representation of the button.
         *
         * @official
         */
        buttonEl: HTMLButtonElement;

        /**
         * The function that's called after clicking the button.
         *
         * @remark Using `ButtonComponent.onClick(callback)` assigns the callback to this method.
         * @unofficial
         */
        clickCallback?(): void;

        /**
         * The constructor for the button component.
         *
         * @param containerEl - The container element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;

        /**
         * Sets the click event callback for the button component.
         *
         * @param callback - The callback to set.
         * @returns The button component.
         * @example
         * ```ts
         * button.onClick(() => {
         *     console.log('Button clicked');
         * });
         * ```
         * @official
         */
        onClick(callback: (evt: MouseEvent) => any): this;

        /**
         * Removes the call to action style from the button component.
         * `CTA` stands for `call to action`.
         *
         * @returns The button component.
         * @official
         */
        removeCta(): this;

        /**
         * Sets the text for the button component.
         *
         * @param name - The name to set.
         * @returns The button component.
         * @example
         * ```ts
         * button.setButtonText('My button');
         * ```
         * @official
         */
        setButtonText(name: string): this;

        /**
         * Sets the class for the button component.
         *
         * @param cls - The class to set.
         * @returns The button component.
         * @example
         * ```ts
         * button.setClass('my-class');
         * ```
         * @official
         */
        setClass(cls: string): this;

        /**
         * Sets the button component to a call to action button.
         * `CTA` stands for `call to action`.
         * It changes how the button is styled, to make it stand out.
         * Use it sparingly, to make the button stand out from others nearby.
         *
         * @returns The button component.
         * @example `Check for updates` button in the `General` options settings.
         * @official
         */
        setCta(): this;

        /**
         * Sets the disabled state of the button component.
         *
         * @param disabled - Whether to disable the button component.
         * @returns The button component.
         * @example
         * ```ts
         * button.setDisabled(true);
         * ```
         * @official
         */
        setDisabled(disabled: boolean): this;

        /**
         * Sets the icon for the button component.
         *
         * @param icon - The icon to set.
         * @returns The button component.
         * @example
         * ```ts
         * button.setIcon('dice');
         * ```
         * @official
         */
        setIcon(icon: IconName): this;

        /**
         * Sets the tooltip for the button component.
         *
         * @param tooltip - The tooltip to set.
         * @param options - The options for the tooltip.
         * @returns The button component.
         * @official
         */
        setTooltip(tooltip: string, options?: TooltipOptions): this;

        /**
         * Sets the button component to a warning button.
         * Usually it's added to buttons that perform destructive actions, such as deleting user's data.
         *
         * @example `Uninstall` button in the modal of uninstalling a community plugin
         * @example `Clear` button in the `File recovery` core plugin setting
         * @returns The button component.
         * @official
         */
        setWarning(): this;
    }
}
