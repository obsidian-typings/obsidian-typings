import type { SearchMatcher } from './SearchMatcher.d.ts';
import type { SearchTextMatcher } from './SearchTextMatcher.d.ts';

/**
 * A tag matcher. Matching ignores case and includes descendant tags.
 *
 * @public
 * @unofficial
 */
export interface SearchTagMatcher extends SearchMatcher {
  /** The text matcher, normalized to include the leading hash. */
  matcher: SearchTextMatcher;
}
