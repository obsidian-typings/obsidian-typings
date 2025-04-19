export {};

declare module 'obsidian' {
    interface TFile extends TAbstractFile {
        /**
         * Whether the file is being saved.
         */
        saving: boolean;

        /**
         * Caches file's content, that can be retrieved via `await app.vault.cachedRead(file)`.
         *
         * @param content The content to cache. If `null`, the cache is cleared.
         */
        cache(content: string | null): void;
        /**
         * Gets the short name of the file.
         *
         * For `a/b/c.md`, it returns `c`.
         *
         * For `a/b/c.any-other-extension` it returns `c.any-other-extension`.
         *
         * @returns The short name of the file.
         */
        getShortName(): string;
        /**
         * Removes the file from the cache if its content length greater than `app.vault.cacheLimit`.
         */
        updateCacheLimit(): unknown;
    }
}
