export {};

declare module 'obsidian' {
    /**
     * The cache of the list item in the note.
     * List items are markdown blocks that are used to create lists.
     *
     * ```markdown
     * - Unordered List Item 1
     * - Unordered List Item 2
     * - Unordered List Item 3
     *
     * 1. Ordered List Item 1
     * 2. Ordered List Item 2
     * 3. Ordered List Item 3
     * ```
     */
    interface ListItemCache extends CacheItem {
        /**
         * The block ID of this list item, if defined.
         *
         * @official
         */
        id?: string | undefined;

        /**
         * Line number of the parent list item (position.start.line).
         * If this item has no parent (e.g. it's a root level list),
         * then this value is the negative of the line number of the first list item (start of the list).
         *
         * Can be used to deduce which list items belongs to the same group (item1.parent === item2.parent).
         * Can be used to reconstruct hierarchy information (parentItem.position.start.line === childItem.parent).
         *
         * @official
         */
        parent: number;

        /**
         * A single character indicating the checked status of a task.
         * The space character `' '` is interpreted as an incomplete task.
         * Any other character is interpreted as completed task.
         * `undefined` if this item isn't a task.
         *
         * @official
         */
        task?: string | undefined;
    }
}
