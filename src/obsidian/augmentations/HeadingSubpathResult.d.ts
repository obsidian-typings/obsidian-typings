export {};

declare module 'obsidian' {
    /**
     * Subpath result for a heading from {@link resolveSubpath}
     *
     * @example
     * ```ts
     * console.log(resolveSubpath(myNoteCache, '#foo'));
     * ```
     */
    interface HeadingSubpathResult extends SubpathResult {
        /**
         * The cache of the found heading.
         *
         * @official
         */
        current: HeadingCache;

        /**
         * The cache of the next heading on the same or higher level.
         *
         * @official
         */
        next: HeadingCache;

        /**
         * The type of the subpath result.
         *
         * @official
         */
        type: 'heading';
    }
}
