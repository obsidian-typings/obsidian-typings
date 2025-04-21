export {};

declare module 'obsidian' {
    /**
     * A cache item with a position within a note.
     */
    interface CacheItem {
        /**
         * Position of this item in the note.
         *
         * @official
         */
        position: Pos;
    }
}
