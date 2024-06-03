export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface EditorSuggest<T> {
        showSuggestions(results: SearchResult[]): void;
    }
}
