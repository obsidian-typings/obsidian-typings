import type { EditorSuggest } from "obsidian";
import type { FileSuggestManager } from "./FileSuggestManager.js";

/** @todo Documentation incomplete */
export interface FileSuggest<T> extends EditorSuggest<T> {
    /**
     * Manages fetching of suggestions from metadatacache
     */
    suggestManager: FileSuggestManager;
}
