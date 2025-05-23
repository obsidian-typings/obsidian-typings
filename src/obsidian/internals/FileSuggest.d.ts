import type { EditorSuggest } from 'obsidian';
import type { FileSuggestManager } from './FileSuggestManager.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface FileSuggest<T> extends EditorSuggest<T> {
    /**
     * Manages fetching of suggestions from metadatacache.
     */
    suggestManager: FileSuggestManager;
}
