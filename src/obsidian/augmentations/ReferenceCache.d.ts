export {};

declare module 'obsidian' {
    interface ReferenceCache extends Reference, CacheItem {}
}
