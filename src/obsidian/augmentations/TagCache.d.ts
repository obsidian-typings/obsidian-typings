export {};

declare module 'obsidian' {
    /**
     * The cache of the tag in the note.
     *
     * ```markdown
     * ---
     * tags:
     *   - foo
     *   - bar
     * ---
     *
     * #baz
     * ```
     */
    interface TagCache extends CacheItem {
        /**
         * The tag.
         *
         * @example #foo
         * @official
         */
        tag: string;
    }
}
