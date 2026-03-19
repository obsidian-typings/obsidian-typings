import type { EditorSuggest } from 'obsidian';

import type { FileSuggestManager } from './FileSuggestManager.d.ts';

/**
 * Editor suggestion provider for file and link autocompletion.
 *
 * @typeParam T - The type of the suggestion items.
 * @public
 * @unofficial
 */
export interface FileSuggest<T> extends EditorSuggest<T> {
  /**
   * Manages fetching of suggestions from metadatacache.
   */
  suggestManager: FileSuggestManager;
}
