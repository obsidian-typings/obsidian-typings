/**
 * Configuration for creating a search query.
 *
 * @public
 * @unofficial
 */
export interface SearchQueryConfig {
  /** Whether the search is case sensitive. */
  caseSensitive?: boolean;
  /** Whether the search string is treated as a literal. */
  literal?: boolean;
  /** Whether the search string is a regular expression. */
  regexp?: boolean;
  /** The replacement string. */
  replace?: string;
  /** The search string. */
  search: string;
  /** Whether the search matches whole words only. */
  wholeWord?: boolean;
}
