export {};

declare module 'obsidian' {
    /**
     * Provides a unified interface for users to configure the plugin.
     * @see {@link https://docs.obsidian.md/Plugins/User+interface/Settings#Register+a+settings+tab}.
     * @since 0.9.7
     */
    interface PluginSettingTab extends SettingTab {
        /**
         * Creates a new PluginSettingTab.
         *
         * @param app - The Obsidian app instance.
         * @param plugin - The plugin instance.
         * @returns The plugin setting tab instance.
         * To extract the constructor type, use `ExtractConstructor<PluginSettingTab>`.
         * @official
         * @deprecated - Added only for typing purposes.
         */
        constructor__(app: App, plugin: Plugin): this;
    }
}
