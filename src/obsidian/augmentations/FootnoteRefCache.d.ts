export {};

declare module 'obsidian' {
    /**
     * The cache of the footnote reference in the note.
     *
     * ```markdown
     * foo [^1]
     *
     * [^1]: bar
     *
     * baz [^qux]
     *
     * [^qux]: quux
     * ```
     */
    interface FootnoteRefCache extends CacheItem {
        /**
         * The ID of the footnote reference.
         *
         * @example
         * ```ts
         * console.log(footnoteRefCache.id); // 1
         * console.log(footnoteRefCache.id); // qux
         * ```
         * @official
         */
        id: string;
    }
}
