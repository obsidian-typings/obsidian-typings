export {};

declare module 'obsidian' {
    /**
     * The cache of the heading in the note.
     *
     * ```markdown
     * # foo
     * ## bar
     * ### baz
     * ```
     */
    interface HeadingCache extends CacheItem {
        /**
         * The heading text.
         *
         * @example
         * ```ts
         * console.log(headingCache.heading); // foo
         * ```
         * @official
         */
        heading: string;

        /**
         * Number between 1 and 6.
         *
         * @example
         * ```ts
         * console.log(headingCache.level); // 1
         * ```
         * @official
         */
        level: number;
    }
}
