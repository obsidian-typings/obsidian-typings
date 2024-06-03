import type { SearchResult } from "obsidian";

/** @todo Documentation incomplete */
export default interface EditorSuggest<T> {
    showSuggestions(results: SearchResult[]): void;
}
