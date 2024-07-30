export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface BlockCache {
        /**
         * Reference to App
         */
        app: App;
        /** @internal */
        cache: unknown;
    }
}
