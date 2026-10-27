import type { SearchMatcher } from './SearchMatcher.d.ts';

/**
 * A negation or scope matcher. Identical fields do not imply identical matching semantics.
 *
 * @public
 * @unofficial
 */
export interface SearchUnaryMatcher extends SearchMatcher {
  /** The wrapped matcher. */
  matcher: SearchMatcher;
}
