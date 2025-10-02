export {};

declare module 'obsidian' {
    /**
     * Extra button component, for secondary actions.
     * @since 0.9.7
     */
    interface ExtraButtonComponent extends BaseComponent {
        /**
         * The HTML element representation of the extra button.
         *
         * @official
         * @since 0.9.7
         */
        extraSettingsEl: HTMLElement;

        /**
         * The function that's called after clicking the button.
         *
         * @remark Using `ExtraButtonComponent.onClick(callback)` assigns the callback to this method.
         * @unofficial
         */
        changeCallback?(): void;

        /**
         * Create a new ExtraButtonComponent.
         *
         * @param containerEl - The container element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;

        /**
         * Set the click callback of the extra button.
         *
         * @param callback - The callback to call when the button is clicked.
         * @returns The extra button component.
         * @example
         * ```ts
         * extraButton.onClick(() => {
         *     console.log('Button clicked');
         * });
         * ```
         * @official
         * @since 0.9.7
         */
        onClick(callback: () => any): this;

        /**
         * Set the disabled state of the extra button.
         *
         * @param disabled - Whether the button is disabled.
         * @returns The extra button component.
         * @example
         * ```ts
         * extraButton.setDisabled(true);
         * ```
         * @official
         * @since 1.2.3
         */
        setDisabled(disabled: boolean): this;

        /**
         * Set the icon of the extra button.
         *
         * @param icon - ID of the icon, can use any icon loaded with {@link addIcon} or from the inbuilt library.
         * @see The Obsidian icon library includes the {@link https://lucide.dev/ Lucide icon library}, any icon name from their site will work here.
         * @returns The extra button component.
         * @example
         * ```ts
         * extraButton.setIcon('dice');
         * ```
         * @official
         * @since 0.9.7
         */
        setIcon(icon: IconName): this;

        /**
         * Set the tooltip of the extra button.
         *
         * @param tooltip - The tooltip text.
         * @param options - The tooltip options.
         * @returns The extra button component.
         * @example
         * ```ts
         * extraButton.setTooltip('Tooltip text');
         * ```
         * @official
         * @since 1.1.0
         */
        setTooltip(tooltip: string, options?: TooltipOptions): this;
    }
}
