import type { Range } from '@codemirror/state';

import type { MapMode } from '../internals/MapMode.d.ts';

export {};

declare module '@codemirror/state' {
  interface RangeValue {
    /**
     * The bias value at the end of the range.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link endSide} instead.
     */
    endSide__?: number;

    /**
     * The mode with which the location of the range should be mapped when its `from` and `to`
     * are the same.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link mapMode} instead.
     */
    mapMode__?: MapMode;

    /**
     * Determines whether this value marks a point range.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link point} instead.
     */
    point__?: boolean;

    /**
     * The bias value at the start of the range.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link startSide} instead.
     */
    startSide__?: number;

    /**
     * Compare this value with another value. Used when comparing range sets.
     *
     * @param other - The other range value.
     * @returns Whether the values are equal.
     * @official
     */
    eq(other: RangeValue): boolean;

    /**
     * Create a range with this value.
     *
     * @param from - The start position.
     * @param to - The end position.
     * @returns The created range.
     * @official
     */
    range(from: number, to?: number): Range<this>;
  }
}
