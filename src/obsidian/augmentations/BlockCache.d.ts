export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface BlockCache extends CacheItem {
        /**
         * Reference to App.
         *
         * @unofficial
         */
        app: App;

        /** @unofficial */
        cache: unknown;
    }
}
