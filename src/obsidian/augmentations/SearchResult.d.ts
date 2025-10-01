export {};

declare module 'obsidian' {
    /**
     * A search result.
     * @since 0.9.21
     */
    interface SearchResult {
        /**
         * The matches of the search result.
         *
         * @official
         */
        matches: SearchMatches;

        /**
         * The score of the search result.
         *
         * @official
         */
        score: number;
    }
}
