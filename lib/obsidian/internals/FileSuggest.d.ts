import type { EditorSuggest } from "obsidian";
import type { FileSuggestManager } from "../index.d.ts";

/** @todo Documentation incomplete */
export default interface FileSuggest<T> extends EditorSuggest<T> {
    /**
     * Manages fetching of suggestions from metadatacache
     */
    suggestManager: FileSuggestManager;
}
