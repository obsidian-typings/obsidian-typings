export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a duration. Durations can be used to modify a {@link DateValue} or can
     * result from subtracting a DateValue from another.
     *
     * @since 1.10.0
     */
    interface DurationValue extends NotNullValue {
        /**
         * Modifies the provided {@DateValue} by this duration.
         *
         * @param value - The DateValue to modify.
         * @param subtract - Whether to subtract the duration from the DateValue.
         * @returns The modified DateValue.
         * @official
         * @since 1.10.0
         */
        addToDate(value: DateValue, subtract?: boolean): DateValue;

        /**
         * Convert this duration into milliseconds.
         *
         * @returns The duration in milliseconds.
         * @official
         * @since 1.10.0
         */
        getMilliseconds(): number;

        /**
         * Returns a boolean indicating whether this DurationValue is truthy.
         *
         * @returns A boolean indicating whether this DurationValue is truthy.
         * @official
         * @since 1.10.0
         */
        isTruthy(): boolean;

        /**
         * String representation of this DurationValue.
         *
         * @returns The string representation of this DurationValue.
         * @official
         * @since 1.10.0
         */
        toString(): string;
    }

    namespace DurationValue {
        /**
         * Create a new DurationValue from milliseconds.
         *
         * @param milliseconds - The milliseconds to create a DurationValue from.
         * @returns The new DurationValue.
         *
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link DurationValue.fromMilliseconds} instead.
         */
        function fromMilliseconds__(milliseconds: number): DurationValue;

        /**
         * Create a new DurationValue using an ISO 8601 duration.
         * See {@link https://en.wikipedia.org/wiki/ISO_8601#Durations} for duration format details.
         *
         * @param input - The ISO 8601 duration string.
         * @returns The new DurationValue.
         *
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link DurationValue.parseFromString} instead.
         */
        function parseFromString__(input: string): DurationValue | null;
    }
}
