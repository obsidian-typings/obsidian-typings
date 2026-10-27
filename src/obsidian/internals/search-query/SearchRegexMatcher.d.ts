import type { SearchMatcher } from './SearchMatcher.d.ts';

/**
 * A regular expression matcher. Matching compiles its source with `gm` or `gmi`.
 *
 * @public
 * @unofficial
 */
export interface SearchRegexMatcher extends SearchMatcher {
  /** The regular expression source, without delimiters or flags. */
  regex: string;
}
