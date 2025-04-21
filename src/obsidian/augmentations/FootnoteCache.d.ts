export {};

declare module 'obsidian' {
    /**
     * The cache of the footnote in the note.
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
    interface FootnoteCache extends CacheItem {
        /**
         * The ID of the footnote.
         *
         * @example
         * ```ts
         * console.log(footnoteCache.id); // 1
         * console.log(footnoteCache.id); // qux
         * ```
         * @official
         */
        id: string;
    }
}
