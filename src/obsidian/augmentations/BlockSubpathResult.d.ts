export {};

declare module 'obsidian' {
    /**
     * Subpath result for a block from {@link resolveSubpath}
     *
     * @example
     * ```ts
     * console.log(resolveSubpath(myNoteCache, '#^foo'));
     * ```
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
