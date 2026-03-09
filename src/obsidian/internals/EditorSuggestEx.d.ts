import type { EditorSuggest } from 'obsidian';

/**
 * Extended editor suggest interface for managing editor suggestion providers.
 * @public
 * @unofficial
 */
export interface EditorSuggestEx {
  /** Currently active and rendered editor suggestion popup. */
  currentSuggest?: EditorSuggest<unknown>;

  /** Registered editor suggestion providers. */
  suggests: EditorSuggest<unknown>[];
}
