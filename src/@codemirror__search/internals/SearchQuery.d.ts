import type { EditorState } from '@codemirror/state';

import type { CmText } from '../../@codemirror__state/internals/CmText.d.ts';
import type { SearchQueryConfig } from './SearchQueryConfig.d.ts';
import type { SearchQueryMatch } from './SearchQueryMatch.d.ts';

/**
 * Represents a search query with its configuration and methods for searching.
 *
 * @public
 * @unofficial
 */
export declare class SearchQuery {
  /** Whether the search is case sensitive. */
  readonly caseSensitive: boolean;

  /** Whether the search string is treated as a literal. */
  readonly literal: boolean;

  /** Whether the search string is a regular expression. */
  readonly regexp: boolean;

  /** The replacement string. */
  readonly replace: string;

  /** The search string. */
  readonly search: string;

  /** Whether the search query is valid. */
  readonly valid: boolean;

  /** Whether the search matches whole words only. */
  readonly wholeWord: boolean;

  /**
   * Create new instance of {@link SearchQuery}
   *
   * @param config - Configuration
   */
  constructor(config: SearchQueryConfig);

  /**
   * Check whether this query is equal to another.
   *
   * @param other - The other search query to compare with.
   * @returns Whether the queries are equal.
   */
  eq(other: SearchQuery): boolean;

  /**
   * Get a cursor for iterating over matches.
   *
   * @param state - The text or editor state to search in.
   * @param from - Optional start position.
   * @param to - Optional end position.
   * @returns An iterator over match ranges.
   */
  getCursor(state: CmText | EditorState, from?: number, to?: number): Iterator<SearchQueryMatch>;
}
