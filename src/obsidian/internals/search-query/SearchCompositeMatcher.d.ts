import type { SearchMatcher } from './SearchMatcher.d.ts';

/**
 * An AND or OR matcher. Use the runtime guards to distinguish their semantics.
 *
 * @public
 * @unofficial
 */
export interface SearchCompositeMatcher extends SearchMatcher {
  /** The child matchers, in query order. */
  matchers: SearchMatcher[];
}
