export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a Date.
     *
     * @since 1.10.0
     */
    interface DateValue extends NotNullValue {
        /**
         * Returns a new DateValue with any time portion in this DateValue removed.
         *
         * @returns a new DateValue with any time portion in this DateValue removed.
         * @official
         * @since 1.10.0
         */
        dateOnly(): DateValue;

        /**
         * Returns a boolean indicating whether this DateValue is truthy.
         *
         * @returns a boolean indicating whether this DateValue is truthy.
         * @official
         * @since 1.10.0
         */
        isTruthy(): boolean;

        /**
         * Returns a new {@link RelativeDateValue} based on this DateValue.
         *
         * @returns a new {@link RelativeDateValue} based on this DateValue.
         * @official
         * @since 1.10.0
         */
        relative(): string;

        /**
         * String representation of this DateValue.
         *
         * @returns The string representation of this DateValue.
         * @official
         * @since 1.10.0
         */
        toString(): string;
    }

    namespace DateValue {
        /**
         * Create new DateValue from an input string.
         *
         * @param input - An ISO 8601 date or datetime string.
         * @returns A new DateValue from the input string.
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
