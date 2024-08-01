import type { FileSuggestManager } from "../index.js";
import type { EditorSuggest } from "obsidian";
/** @todo Documentation incomplete */
export interface FileSuggest<T> extends EditorSuggest<T> {
    /**
     * Manages fetching of suggestions from metadatacache
     */
    suggestManager: FileSuggestManager;
}
