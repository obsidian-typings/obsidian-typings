import type {
  ChangeDesc,
  Range,
  RangeComparator,
  RangeCursor,
  RangeValue,
  SpanIterator
} from '@codemirror/state';

import type { RangeSetUpdate } from '../internals/RangeSetUpdate.d.ts';

export {};

declare module '@codemirror/state' {
  interface RangeSet<T extends RangeValue> {
    /**
     * The number of ranges in the set.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link size} instead.
     */
    readonly size__?: number;

    /**
     * Iterate over the ranges that touch the region `from` to `to`.
     *
     * @param from - Start of the region.
     * @param to - End of the region.
     * @param f - Callback for each range.
     * @official
     */
    between(from: number, to: number, f: (from: number, to: number, value: T) => false | void): void;

    /**
     * Iterate over the ranges in this set, in order.
     *
     * @param from - Start position for iteration.
     * @returns The range cursor.
     * @official
     */
    iter(from?: number): RangeCursor<T>;

    /**
     * Map this range set through a set of changes, return the new set.
     *
     * @param changes - The change description.
     * @returns The mapped range set.
     * @official
     */
    map(changes: ChangeDesc): RangeSet<T>;

    /**
     * Update the range set, optionally adding new ranges or filtering out existing ones.
     *
     * @param updateSpec - The update specification.
     * @returns The updated range set.
     * @official
     */
    update<U extends T>(updateSpec: RangeSetUpdate<U>): RangeSet<T>;
  }

  namespace RangeSet {
    /**
     * Create a range set for the given range or array of ranges.
     *
     * @param ranges - The ranges.
     * @param sort - Whether to sort the ranges.
     * @returns The created range set.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link RangeSet.of} instead.
     */
    function of__<T extends RangeValue>(ranges: Range<T> | readonly Range<T>[], sort?: boolean): RangeSet<T>;

    /**
     * The empty set of ranges.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link RangeSet.empty} instead.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Matches real @codemirror/state API signature.
    const empty__: RangeSet<any>;

    /**
     * Iterate over the ranges in a collection of sets, in order.
     *
     * @param sets - The range sets.
     * @param from - Start position.
     * @returns The range cursor.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link RangeSet.iter} instead.
     */
    function iter__<T extends RangeValue>(sets: readonly RangeSet<T>[], from?: number): RangeCursor<T>;

    /**
     * Iterate over two groups of sets, calling methods on comparator to notify it of possible
     * differences.
     *
     * @param oldSets - The old range sets.
     * @param newSets - The new range sets.
     * @param textDiff - The text diff.
     * @param comparator - The range comparator.
     * @param minPointSize - Minimum point size.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link RangeSet.compare} instead.
     */
    function compare__<T extends RangeValue>(
      oldSets: readonly RangeSet<T>[],
      newSets: readonly RangeSet<T>[],
      textDiff: ChangeDesc,
      comparator: RangeComparator<T>,
      minPointSize?: number
    ): void;

    /**
     * Compare the contents of two groups of range sets, returning `true` if they are equivalent.
     *
     * @param oldSets - The old range sets.
     * @param newSets - The new range sets.
     * @param from - Start position.
     * @param to - End position.
     * @returns Whether the sets are equal.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link RangeSet.eq} instead.
     */
    function eq__<T extends RangeValue>(oldSets: readonly RangeSet<T>[], newSets: readonly RangeSet<T>[], from?: number, to?: number): boolean;

    /**
     * Iterate over a group of range sets at the same time, notifying the iterator about the
     * ranges covering every given piece of content.
     *
     * @param sets - The range sets.
     * @param from - Start position.
     * @param to - End position.
     * @param iterator - The span iterator.
     * @param minPointSize - Minimum point size.
     * @returns The open count at the end.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link RangeSet.spans} instead.
     */
    function spans__<T extends RangeValue>(sets: readonly RangeSet<T>[], from: number, to: number, iterator: SpanIterator<T>, minPointSize?: number): number;

    /**
     * Join an array of range sets into a single set.
     *
     * @param sets - The range sets.
     * @returns The joined range set.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link RangeSet.join} instead.
     */
    function join__<T extends RangeValue>(sets: readonly RangeSet<T>[]): RangeSet<T>;
  }
}
