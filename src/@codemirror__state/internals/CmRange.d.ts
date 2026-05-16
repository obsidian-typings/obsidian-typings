import type { RangeValue } from './RangeValue.d.ts';

/**
 * A range associates a value with a range of positions.
 *
 * @public
 * @unofficial
 */
export interface CmRange<T extends RangeValue> {
  /** The start of the range. */
  readonly from: number;

  /** The end of the range. */
  readonly to: number;

  /** The value associated with this range. */
  readonly value: T;
}
