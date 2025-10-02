export {};

declare module 'obsidian' {
    /**
     * A search result container.
     * @since 0.9.21
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
