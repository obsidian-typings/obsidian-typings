import type { RangeValue } from '@codemirror/state';

import type { CmRange } from './CmRange.d.ts';

/**
 * Configuration passed to `RangeSet.update`.
 *
 * @public
 * @unofficial
 */
export interface RangeSetUpdate<T extends RangeValue> {
  /** An array of ranges to add. */
  add?: readonly CmRange<T>[];

  /** The start of the range to filter. */
  filterFrom?: number;

  /** The end of the range to filter. */
  filterTo?: number;

  /** Whether to sort the ranges. */
  sort?: boolean;

  /**
   * A filter function that determines which existing ranges to keep.
   *
   * @param from - The start of the range.
   * @param to - The end of the range.
   * @param value - The range value.
   * @returns Whether to keep the range.
   */
  filter?(from: number, to: number, value: T): boolean;
}
