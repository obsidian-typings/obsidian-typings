export {};

declare module 'obsidian' {
    /**
     * The result of a fuzzy search.
     *
     * @typeParam T - The type of the item that was searched for.
     * @since 0.9.20
     */
    interface FuzzyMatch<T> {
        /**
         * The item that was matched.
         *
         * @official
         * @since 0.9.20
         */
        item: T;

        /**
         * Search result of the fuzzy match.
         *
         * @official
         */
        match: SearchResult;
    }
}
