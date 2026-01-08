export {};

declare module 'obsidian' {
    /**
     * Setting group.
     *
     * @since 1.11.0
     */
    interface SettingGroup {
        /**
         * Add a CSS class to the setting group.
         *
         * @param cls - The CSS class to add.
         * @returns The setting group.
         * @example
         * ```ts
         * settingGroup.addClass('foo');
         * ```
         * @official
         * @since 1.11.0
         */
        addClass(cls: string): this;

        /**
         * Add an extra button to the setting group.
         *
         * @param cb - the callback function.
         * @returns the setting group.
         * @official
         * @since 1.11.0
         */
        addExtraButton(cb: (component: ExtraButtonComponent) => any): this;

        /**
         * Add a search input at the beginning of the setting group. Useful for filtering
         * results or adding an input for quick entry.
         *
         * @param cb - the callback function.
         * @returns the setting group.
         * @official
         * @since 1.11.0
         */
        addSearch(cb: (component: SearchComponent) => any): this;

        /**
         * Add a setting to the setting group.
         *
         * @param cb - The callback to add the setting.
         * @returns The setting group.
         * @example
         * ```ts
         * settingGroup.addSetting((setting) => {
         *     setting.setName('foo');
         * });
         * ```
         * @official
         * @since 1.11.0
         */
        addSetting(cb: (setting: Setting) => void): this;

        /**
         * Create a new setting group.
         *
         * @param containerEl - The container element.
         * @returns The setting group.
         * @official
         * @since 1.11.0
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;

        /**
         * Set the heading of the setting group.
         *
         * @param text - The text to set the heading to.
         * @returns The setting group.
         * @example
         * ```ts
         * settingGroup.setHeading('foo');
         * ```
         * @official
         * @since 1.11.0
         */
        setHeading(text: string | DocumentFragment): this;
    }
}
