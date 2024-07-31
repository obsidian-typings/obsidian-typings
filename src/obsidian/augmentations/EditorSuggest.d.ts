export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface EditorSuggest<T> extends PopoverSuggest<T> {
        showSuggestions(results: SearchResult[]): void;
    }
}
