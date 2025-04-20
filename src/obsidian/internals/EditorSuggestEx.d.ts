import type { EditorSuggest } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface EditorSuggestEx {
    currentSuggest?: EditorSuggest<unknown>;
    suggests: EditorSuggest<unknown>[];
}
