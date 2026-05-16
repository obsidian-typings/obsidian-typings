import type { CmRange } from './CmRange.d.ts';
import type { RangeSetUpdate } from './RangeSetUpdate.d.ts';
import type { RangeValue } from './RangeValue.d.ts';

/**
 * A collection of ranges with associated values, stored as an immutable balanced tree.
 *
 * @public
 * @unofficial
 */
export declare class RangeSet<T extends RangeValue> {
  /** An empty range set. */
  static empty: RangeSet<never>;

  /**
   * Create a range set from an array of ranges.
   *
   * @param ranges - The ranges to create the set from.
   * @param sort - Whether to sort the ranges.
   * @returns The created range set.
   */
  static of<T extends RangeValue>(ranges: CmRange<T> | readonly CmRange<T>[], sort?: boolean): RangeSet<T>;

  /** The number of ranges in the set. */
  get size(): number;

  /**
   * Update this range set, adding or removing ranges.
   *
   * @param spec - The update specification.
   * @returns The updated range set.
   */
  update(spec: RangeSetUpdate<T>): RangeSet<T>;
}
