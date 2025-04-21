export {};

declare module 'obsidian' {
    /**
     * The result of a fuzzy search.
     *
     * @typeParam T - The type of the item that was searched for.
     */
    interface FuzzyMatch<T> {
        /**
         * The item that was matched.
         *
         * @official
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
