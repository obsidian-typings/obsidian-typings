import type { EditorSuggest } from 'obsidian';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface EditorSuggestEx {
    /** @todo Documentation incomplete. */
    currentSuggest?: EditorSuggest<unknown>;

    /** @todo Documentation incomplete. */
    suggests: EditorSuggest<unknown>[];
}
