export {};

declare module 'obsidian' {
    interface PluginManifest {
        /**
         * Name of the author of the plugin.
         *
         * @unofficial
         */
        author: string;
        /**
         * URL to the author's website.
         *
         * @unofficial
         */
        authorUrl?: string;
        /**
         * Description of the plugin's functionality.
         *
         * @unofficial
         */
        description: string;
        /**
         * Storage location of the plugin relative to the vault root.
         *
         * @unofficial
         */
        dir?: string;
        /**
         * URL for funding the author.
         *
         * @unofficial
         */
        fundingUrl?: string;
        /**
         * Unique identifier of the plugin.
         *
         * @unofficial
         */
        id: string;
        /**
         * Whether the plugin is designed for desktop use only.
         *
         * @unofficial
         */
        isDesktopOnly?: boolean;
        /**
         * Minimum Obsidian version compatible with the plugin.
         *
         * @unofficial
         */
        minAppVersion: string;
        /**
         * Name of the plugin.
         *
         * @unofficial
         */
        name: string;
        /**
         * Version of the plugin.
         *
         * @unofficial
         */
        version: string;
    }
}
