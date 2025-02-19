import type { EditorSuggest } from 'obsidian';

/** @public */
export interface EditorSuggestEx {
    currentSuggest?: EditorSuggest<unknown>;
    suggests: EditorSuggest<unknown>[];
}
