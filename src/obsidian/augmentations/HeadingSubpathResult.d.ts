export {};

declare module 'obsidian' {
    /**
     * Subpath result for a heading from {@link resolveSubpath}
     *
     * @example
     * ```ts
     * console.log(resolveSubpath(myNoteCache, '#foo'));
     * ```
     * @since 0.9.16
     */
    interface HeadingSubpathResult extends SubpathResult {
        /**
         * The cache of the found heading.
         *
         * @official
         * @since 0.9.16
         */
        current: HeadingCache;

        /**
         * The cache of the next heading on the same or higher level.
         *
         * @official
         * @since 0.9.16
         */
        next: HeadingCache;

        /**
         * The type of the subpath result.
         *
         * @official
         * @since 0.9.16
         */
        type: 'heading';
    }
}
