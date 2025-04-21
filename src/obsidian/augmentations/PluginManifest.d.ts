export {};

declare module 'obsidian' {
    /**
     * Metadata about a Community plugin.
     * @see {@link https://docs.obsidian.md/Reference/Manifest}.
     */
    interface PluginManifest {
        /**
         * The author's name.
         *
         * @official
         */
        author: string;

        /**
         * A URL to the author's website.
         *
         * @official
         */
        authorUrl?: string;

        /**
         * A description of the plugin.
         *
         * @official
         */
        description: string;

        /**
         * Vault path to the plugin folder in the config directory.
         *
         * @official
         */
        dir?: string;

        /**
         * URL for funding the author.
         *
         * @unofficial
         */
        fundingUrl?: string;

        /**
         * The plugin ID.
         *
         * @official
         */
        id: string;

        /**
         * Whether the plugin can be used only on desktop.
         *
         * @official
         */
        isDesktopOnly?: boolean;

        /**
         * The minimum required Obsidian version to run this plugin.
         *
         * @official
         */
        minAppVersion: string;

        /**
         * The display name.
         *
         * @official
         */
        name: string;

        /**
         * The current version, using {@link https://semver.org/ Semantic Versioning}.
         *
         * @official
         */
        version: string;
    }
}
