export {};

declare module 'obsidian' {
    /**
     * Cache item containing a notes footnotes metadata.
     */
    interface FootnoteCache extends CacheItem {
        /**
         * @unofficial
         */
        identifier: string;
    }
}
