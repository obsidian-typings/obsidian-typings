import type { TurndownServiceFilter } from './TurndownServiceFilter.d.ts';
import type { TurndownServiceReplacementFunction } from './TurndownServiceReplacementFunction.d.ts';

/**
 * A rule that defines how to convert specific HTML elements to Markdown.
 *
 * @public
 * @unofficial
 */
export interface TurndownServiceRule {
  /** Filter to match HTML elements. */
  filter: TurndownServiceFilter;
  /** Function that converts the matched element to Markdown. */
  replacement?: TurndownServiceReplacementFunction;
}
