export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface EditorSuggest<T> extends PopoverSuggest<T> {
        /**
         * Show suggestions.
         *
         * @unofficial
         */
        showSuggestions(results: SearchResult[]): void;
    }
}
