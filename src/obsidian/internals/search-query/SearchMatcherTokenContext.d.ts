import type { SearchMatcher } from './SearchMatcher.d.ts';
import type { SearchQueryToken } from './SearchQueryToken.d.ts';

/**
 * The query token at a cursor offset, and the matchers that own it.
 *
 * @public
 * @unofficial
 */
export interface SearchMatcherTokenContext {
  /**
   * The owning matchers, innermost first.
   */
  matcherStack: SearchMatcher[];

  /**
   * The query token.
   */
  token: SearchQueryToken;
}
