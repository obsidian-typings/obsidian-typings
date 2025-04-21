export {};

declare module 'obsidian' {
    /**
     * Provides a unified interface for users to configure the plugin.
     * @see {@link https://docs.obsidian.md/Plugins/User+interface/Settings#Register+a+settings+tab}.
     */
    interface PluginSettingTab extends SettingTab {
        /**
         * Creates a new PluginSettingTab.
         *
         * @param app - The Obsidian app instance.
         * @param plugin - The plugin instance.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(app: App, plugin: Plugin): this;
    }
}
