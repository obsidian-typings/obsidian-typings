export {};

declare module 'obsidian' {
    /**
     * A source for hover links.
     */
    interface HoverLinkSource {
        /**
         * Whether the `hover-link` event requires the 'Mod' key to be pressed to trigger.
         *
         * @official
         */
        defaultMod: boolean;

        /**
         * Text displayed in the 'Page preview' plugin settings.
         * It should match the plugin's display name.
         *
         * @official
         */
        display: string;
    }
}
