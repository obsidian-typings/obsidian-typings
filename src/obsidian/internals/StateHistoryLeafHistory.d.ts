import type { StateHistory } from './StateHistory.d.ts';

/**
 * Back and forward history stacks for a workspace leaf.
 *
 * @public
 * @unofficial
 */
export interface StateHistoryLeafHistory {
  /** Stack of previous leaf states for back navigation. */
  backHistory: StateHistory[];

  /** Stack of forward leaf states for forward navigation. */
  forwardHistory: StateHistory[];
}
