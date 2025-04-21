export {};

declare module 'obsidian' {
    /**
     * The cache of the reference link in the note.
     *
     * ```markdown
     * [google]
     *
     * [google]: https://google.com
     * ```
     */
    interface ReferenceLinkCache extends CacheItem {
        /**
         * The ID of the reference link.
         *
         * @example
         * ```ts
         * console.log(referenceLinkCache.id); // google
         * ```
         * @official
         */
        id: string;

        /**
         * The link of the reference link.
         *
         * @example
         * ```ts
         * console.log(referenceLinkCache.link); // https://google.com
         * ```
         * @official
         */
        link: string;
    }
}
