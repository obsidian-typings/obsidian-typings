import { EditorSuggest } from "./EditorSuggest.d.ts";
import { FileSuggestManager } from "./FileSuggestManager.d.ts";

/** @todo Documentation incomplete */
export default interface FileSuggest<T> extends EditorSuggest<T> {
    /**
     * Manages fetching of suggestions from metadatacache
     */
    suggestManager: FileSuggestManager;
}
