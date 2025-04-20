export {};

declare module 'obsidian' {
    interface SettingTab {
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
    }
}
