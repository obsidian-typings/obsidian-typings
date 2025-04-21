export {};

declare module 'obsidian' {
    /**
     * A search result container.
     */
    interface SearchResultContainer {
        /**
         * The search result.
         *
         * @official
         */
        match: SearchResult;
    }
}
