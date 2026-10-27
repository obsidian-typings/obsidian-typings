import type { SearchUnaryMatcher } from './SearchUnaryMatcher.d.ts';

/**
 * A `match-case:` or `ignore-case:` wrapper.
 *
 * @public
 * @unofficial
 */
export interface SearchCaseMatcher extends SearchUnaryMatcher {
  /** Whether this subtree overrides matching to be case-sensitive. */
  caseSensitive: boolean;
}
