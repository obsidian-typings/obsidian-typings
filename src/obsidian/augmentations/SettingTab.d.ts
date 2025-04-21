export {};

declare module 'obsidian' {
    /**
     * A setting tab.
     *
     * @see {@link https://docs.obsidian.md/Plugins/User+interface/Settings#Register+a+settings+tab}.
     */
    interface SettingTab {
        /**
         * Reference to the app instance.
         *
         * @official
         */
        app: App;

        /**
         * Outermost HTML element on the setting tab.
         *
         * @official
         */
        containerEl: HTMLElement;

        /**
         * Unique ID of the tab.
         *
         * @unofficial
         */
        id: string;

        /**
         * Reference to installed plugins element.
         *
         * Tab is the community plugins tab.
         *
         * @unofficial
         */
        installedPluginsEl?: HTMLElement;

        /**
         * Sidebar name of the tab.
         *
         * @unofficial
         */
        name: string;

        /**
         * Sidebar navigation element of the tab.
         *
         * @unofficial
         */
        navEl: HTMLElement;

        /**
         * Reference to the plugin that initialized the tab.
         *
         * Tab is a plugin tab.
         *
         * @unofficial
         */
        plugin?: Plugin;

        /**
         * Reference to the settings modal.
         *
         * @unofficial
         */
        setting: Setting;

        /**
         * Called when the settings tab should be rendered.
         * @see {@link https://docs.obsidian.md/Plugins/User+interface/Settings#Register+a+settings+tab}.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link display} instead.
         */
        display__(): void;

        /**
         * Hides the contents of the setting tab.
         * Any registered components should be unloaded when the view is hidden.
         * Override this if you need to perform additional cleanup.
         *
         * @official
         */
        hide(): void;
    }
}
