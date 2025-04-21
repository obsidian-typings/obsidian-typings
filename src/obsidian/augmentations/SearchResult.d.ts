export {};

declare module 'obsidian' {
    /**
     * A search result.
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
