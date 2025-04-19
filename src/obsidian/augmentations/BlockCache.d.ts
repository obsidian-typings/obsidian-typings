export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface BlockCache extends CacheItem {
        /**
         * Reference to App.
         */
        app: App;
        /** @internal */
        cache: unknown;
    }
}
