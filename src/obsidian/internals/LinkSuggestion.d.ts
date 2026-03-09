import type { FileSuggestion } from './FileSuggestion.d.ts';

/**
 * @public
 * @unofficial
 * Suggestion for a link to a file.
 */
export interface LinkSuggestion extends FileSuggestion {
  /**
   * Resolved link note alias.
   */
  alias?: string;
}
