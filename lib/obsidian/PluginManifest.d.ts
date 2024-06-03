export default interface PluginManifest {
    /**
     * Name of the author of the plugin
     */
    author: string;
    /**
     * URL to the author's website
     */
    authorUrl?: string;
    /**
     * Description of the plugin's functionality
     */
    description: string;
    /**
     * Storage location of the plugin relative to the vault root
     */
    dir?: string;
    /**
     * URL for funding the author
     */
    fundingUrl?: string;
    /**
     * Unique identifier of the plugin
     */
    id: string;
    /**
     * Whether the plugin is designed for desktop use only
     */
    isDesktopOnly?: boolean;
    /**
     * Minimum Obsidian version compatible with the plugin
     */
    minAppVersion: string;
    /**
     * Name of the plugin
     */
    name: string;
    /**
     * Version of the plugin
     */
    version: string;
}
