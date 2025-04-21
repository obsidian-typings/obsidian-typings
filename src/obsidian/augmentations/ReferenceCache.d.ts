export {};

declare module 'obsidian' {
    /**
     * A reference to a link.
     */
    interface ReferenceCache extends Reference, CacheItem {
    }
}
