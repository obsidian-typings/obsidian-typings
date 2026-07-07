import type { getListValueConstructor } from '../../implementations/constructors/augmentations/values/getListValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping an array of Values. Values do not all need to be of the same type.
   *
   * @since 1.10.0
   */
  interface ListValue extends NotNullValue {
    /**
     * The wrapped array of raw elements. Elements are lazily wrapped into {@link Value}s on access.
     *
     * @unofficial
     */
    data: unknown[];

    /**
     * Compares this list to another element-wise using the provided comparator.
     *
     * @param other - The list to compare to.
     * @param comparator - Returns whether two elements are considered equal.
     * @returns Whether the lists are equal.
     * @unofficial
     */
    compare(other: ListValue, comparator: (a: Value, b: Value) => boolean): boolean;

    /**
     * Get a new {@link obsidian#ListValue} containing the elements from this {@link obsidian#ListValue} and the provided {@link obsidian#ListValue}.
     *
     * @param other - The {@link obsidian#ListValue} to concatenate with.
     * @returns A new {@link obsidian#ListValue} containing the elements from this {@link obsidian#ListValue} and the provided {@link obsidian#ListValue}.
     * @official
     * @since 1.10.0
     */
    concat(other: ListValue): ListValue;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getListValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param value - Contents of the list.
     * @returns The new {@link obsidian#ListValue}.
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes.
     */
    constructor3__?(value: (unknown | Value)[]): this;

    /**
     * Returns the earliest date among the list's elements.
     *
     * @returns A {@link DateValue}, or {@link NullValue} when there are no dates.
     * @unofficial
     */
    earliest(): Value;

    /**
     * Returns a new flattened list, recursively inlining nested lists.
     *
     * @returns The flattened list.
     * @unofficial
     */
    flatten(): ListValue;

    /**
     * Get the value at the provided index.
     *
     * @param index - The index to get the value from.
     * @returns The value at the provided index, or {@link NullValue}.
     * @official
     * @since 1.10.0
     */
    get(index: number): Value;

    /**
     * Extracts the dates from the list's elements.
     *
     * @returns The extracted dates.
     * @unofficial
     */
    getDates(): Date[];

    /**
     * Extracts the numbers from the list's elements.
     *
     * @returns The extracted numbers.
     * @unofficial
     */
    getNumbers(): number[];

    /**
     * Returns a boolean indicating whether any elements in this list loosely equal the provided value.
     *
     * @param value - The value to check for.
     * @returns A boolean indicating whether any elements in this list loosely equal the provided value.
     * @official
     * @since 1.10.0
     */
    includes(value: Value): boolean;

    /**
     * Returns a boolean indicating whether this {@link obsidian#ListValue} is truthy.
     *
     * @returns A boolean indicating whether this {@link obsidian#ListValue} is truthy.
     * @official
     * @since 1.10.0
     */
    isTruthy(): boolean;

    /**
     * Joins the list's elements into a single string.
     *
     * @param separator - The separator placed between elements.
     * @returns The joined string value.
     * @unofficial
     */
    join(separator: string): StringValue;

    /**
     * Returns the latest date among the list's elements.
     *
     * @returns A {@link DateValue}, or {@link NullValue} when there are no dates.
     * @unofficial
     */
    latest(): Value;

    /**
     * Wraps a raw element at the given index into a {@link Value}.
     *
     * @unofficial
     */
    lazyEvaluator(index: number, raw: unknown): Value;

    /**
     * Get the number of elements in this list.
     *
     * @returns the number of elements in this list.
     * @official
     * @since 1.10.0
     */
    length(): number;

    /**
     * Returns the maximum of the list's numeric elements.
     *
     * @returns A {@link NumberValue}, or {@link NullValue} when there are no numbers.
     * @unofficial
     */
    max(): Value;

    /**
     * Returns the mean of the list's numeric elements.
     *
     * @returns A {@link NumberValue}, or {@link NullValue} when there are no numbers.
     * @unofficial
     */
    mean(): Value;

    /**
     * Returns the median of the list's numeric elements.
     *
     * @returns A {@link NumberValue}, or {@link NullValue} when there are no numbers.
     * @unofficial
     */
    median(): Value;

    /**
     * Returns the minimum of the list's numeric elements.
     *
     * @returns A {@link NumberValue}, or {@link NullValue} when there are no numbers.
     * @unofficial
     */
    min(): Value;

    /**
     * Returns a new list with the elements in reverse order.
     *
     * @returns The reversed list.
     * @unofficial
     */
    reverse(): ListValue;

    /**
     * Returns a shallow slice of the list.
     *
     * @param start - The start index.
     * @param end - The end index (exclusive).
     * @returns The sliced list.
     * @unofficial
     */
    slice(start?: number, end?: number): ListValue;

    /**
     * Returns a new sorted list.
     *
     * @returns The sorted list.
     * @unofficial
     */
    sort(): ListValue;

    /**
     * Returns the standard deviation of the list's numeric elements.
     *
     * @returns A {@link NumberValue}, or {@link NullValue} when there are no numbers.
     * @unofficial
     */
    stddev(): Value;

    /**
     * Returns the sum of the list's numeric elements.
     *
     * @returns A {@link NumberValue}, or {@link NullValue} when there are no numbers.
     * @unofficial
     */
    sum(): Value;

    /**
     * Get the string representation of this {@link obsidian#ListValue}.
     *
     * @returns The string representation of this {@link obsidian#ListValue}.
     * @official
     * @since 1.10.0
     */
    toString(): string;

    /**
     * Returns a new list with duplicate elements removed.
     *
     * @returns The de-duplicated list.
     * @unofficial
     */
    unique(): ListValue;
  }

  namespace ListValue {
    /**
     * Type.
     *
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link ListValue.type} instead.
     */
    const type__: string;
  }
}
