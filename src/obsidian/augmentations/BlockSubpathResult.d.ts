export {};

declare module 'obsidian' {
    /**
     * Subpath result for a block from {@link resolveSubpath}
     *
     * @example
     * ```ts
     * console.log(resolveSubpath(myNoteCache, '#^foo'));
     * ```
     * @since 0.13.26
     */
    interface BlockSubpathResult extends SubpathResult {
        /**
         * The block cache.
         *
         * @official
         */
        block: BlockCache;

        /**
         * The list item cache, in case the block is a list item.
         *
         * @official
         */
        list?: ListItemCache;

        /**
         * The type of the subpath result.
         *
         * @official
         */
        type: 'block';
    }
}
