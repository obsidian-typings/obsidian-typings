/** @public */
export interface ThemeManifest {
    /**
     * Name of the author of the theme
     */
    author: string;
    /**
     * URL to the author's website
     */
    authorUrl?: string;
    /**
     * Storage location of the theme relative to the vault root
     */
    dir: string;
    /**
     * URL for funding the author
     */
    fundingUrl?: string;
    /**
     * Minimum Obsidian version compatible with the theme
     */
    minAppVersion: string;
    /**
     * Name of the theme
     */
    name: string;
    /**
     * Version of the theme
     *
     * @remark Defaults to '0.0.0' if no theme manifest was provided in the repository
     */
    version: '0.0.0' | string;
}
