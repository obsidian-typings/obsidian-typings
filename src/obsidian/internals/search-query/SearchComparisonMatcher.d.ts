import type { SearchMatcher } from './SearchMatcher.d.ts';

/**
 * A property-value comparison matcher.
 *
 * @public
 * @unofficial
 */
export interface SearchComparisonMatcher extends SearchMatcher {
  /** The comparison operand. */
  text: string;

  /** The comparison operator. */
  type: 'greaterthan' | 'lessthan';
}
