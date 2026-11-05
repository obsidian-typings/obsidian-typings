import type { SearchResult } from 'obsidian';

import type { FileSuggestModal } from './FileSuggestModal.d.ts';

/**
 * An unresolved-link suggestion offered by a {@link FileSuggestModal}: the link text of a link that points to no
 * existing file.
 *
 * @public
 * @unofficial
 */
export interface FileSuggestModalUnresolvedSuggestion {
  /**
   * The unresolved link text.
   */
  linktext: string;

  /**
   * The fuzzy match of the query against the link text.
   */
  match: SearchResult;

  /**
   * The suggestion type.
   */
  type: 'unresolved';
}
