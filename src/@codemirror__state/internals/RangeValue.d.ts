import type { CmRange } from './CmRange.d.ts';
import type { MapMode } from './MapMode.d.ts';

/**
 * The base class for range values. Subclasses must implement the `eq` method.
 *
 * @public
 * @unofficial
 */
export declare abstract class RangeValue {
  /** The side of the end of the range. */
  endSide: number;

  /** The map mode used for mapping this value. */
  mapMode: MapMode;

  /** Whether this is a point range. */
  point: boolean;

  /** The side of the start of the range. */
  startSide: number;

  /**
   * Compare this value to another value of the same type.
   *
   * @param other - The other value.
   * @returns Whether the two values are equal.
   */
  abstract eq(other: RangeValue): boolean;

  /**
   * Create a range with this value.
   *
   * @param from - The start of the range.
   * @param to - The end of the range.
   * @returns The created range.
   */
  range(from: number, to?: number): CmRange<this>;
}
