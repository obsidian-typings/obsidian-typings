import type { SearchMatcher } from './SearchMatcher.d.ts';

/**
 * A quoted text matcher. Content uses core's word boundaries; filenames use a substring.
 *
 * @public
 * @unofficial
 */
export interface SearchQuotedTextMatcher extends SearchMatcher {
  /** Escaped substring source used outside content. */
  partialMatchRegex: string;

  /** The decoded quoted text. */
  text: string;

  /** Source with core's word boundaries and captured literal, used for content. */
  wholeWordRegex: string;
}
