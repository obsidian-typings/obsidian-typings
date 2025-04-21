export {};

declare module 'obsidian' {
    /**
     * A file.
     */
    interface TFile extends TAbstractFile {
        /**
         * The basename of the file (name without extension).
         *
         * @official
         */
        basename: string;

        /**
         * The extension of the file.
         *
         * @official
         */
        extension: string;

        /**
         * The name of the file (with extension).
         *
         * @official
         */
        name: string;

        /**
         * Whether the file is being saved.
         *
         * @unofficial
         */
        saving: boolean;

        /**
         * The stats of the file.
         *
         * @official
         */
        stat: FileStats;

        /**
         * Caches file's content, that can be retrieved via `await app.vault.cachedRead(file)`.
         *
         * @param content The content to cache. If `null`, the cache is cleared.
         * @unofficial
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
         * @unofficial
         */
        getShortName(): string;

        /**
         * Removes the file from the cache if its content length greater than `app.vault.cacheLimit`.
         *
         * @unofficial
         */
        updateCacheLimit(): unknown;
    }
}
