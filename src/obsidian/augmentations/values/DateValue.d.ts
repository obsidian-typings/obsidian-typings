import type { getDateValueConstructor } from '../../implementations/constructors/augmentations/values/getDateValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping a Date.
   *
   * @since 1.10.0
   */
  interface DateValue extends NotNullValue {
    /**
     * The wrapped date.
     *
     * @unofficial
     */
    date: Date;

    /**
     * Whether this value includes a time portion (as opposed to a date only).
     *
     * @unofficial
     */
    time: boolean;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getDateValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param date - The date.
     * @param showTime - Whether to show time. Defaults to `true`.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor3__(date: unknown, showTime?: boolean): this;

    /**
     * Returns a new {@link obsidian#DateValue} with any time portion in this {@link obsidian#DateValue} removed.
     *
     * @returns a new {@link obsidian#DateValue} with any time portion in this {@link obsidian#DateValue} removed.
     * @official
     * @since 1.10.0
     */
    dateOnly(): DateValue;

    /**
     * Returns a boolean indicating whether this {@link obsidian#DateValue} is truthy.
     *
     * @returns a boolean indicating whether this {@link obsidian#DateValue} is truthy.
     * @official
     * @since 1.10.0
     */
    isTruthy(): boolean;

    /**
     * Formats the date portion of this value as a string.
     *
     * @returns The formatted date.
     * @unofficial
     */
    printDate(): string;

    /**
     * Formats the time portion of this value as a string.
     *
     * @returns The formatted time.
     * @unofficial
     */
    printTime(): string;

    /**
     * Returns a new {@link RelativeDateValue} based on this {@link obsidian#DateValue}.
     *
     * @returns a new {@link RelativeDateValue} based on this {@link obsidian#DateValue}.
     * @official
     * @since 1.10.0
     */
    relative(): string;

    /**
     * String representation of this {@link obsidian#DateValue}.
     *
     * @returns The string representation of this {@link obsidian#DateValue}.
     * @official
     * @since 1.10.0
     */
    toString(): string;
  }

  namespace DateValue {
    /**
     * Create new {@link obsidian#DateValue} from an input string.
     *
     * @param input - An ISO 8601 date or datetime string.
     * @returns A new {@link obsidian#DateValue} from the input string.
     *
     * @example
     * ```typescript
     * parseFromString("2025-12-31")
     * parseFromString("2025-12-31T23:59")
     * parseFromString("2025-12-31T23:59:59")
     * parseFromString("2025-12-31T23:59:59Z-07")
     * ```
     *
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link DateValue.parseFromString} instead.
     */
    function parseFromString__(input: string): DateValue | null;
  }
}
