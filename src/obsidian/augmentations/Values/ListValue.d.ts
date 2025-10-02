export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping an array of Values. Values do not all need to be of the same type.
     *
     * @since 1.10.0
     */
    interface ListValue extends NotNullValue {
        /**
         * Get a new ListValue containing the elements from this ListValue and the provided ListValue.
         *
         * @param other - The ListValue to concatenate with.
         * @returns A new ListValue containing the elements from this ListValue and the provided ListValue.
         * @official
         * @since 1.10.0
         */
        concat(other: ListValue): ListValue;

        /**
         * The array passed in will be modified!
         * @param value - Contents of the list.
         * @returns The new ListValue.
         * @official
         * @since 1.10.0
         */
        constructor__(value: (unknown | Value)[]): this;

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
         * Returns a boolean indicating whether any elements in this list loosely equal the provided value.
         *
         * @param value - The value to check for.
         * @returns A boolean indicating whether any elements in this list loosely equal the provided value.
         * @official
         * @since 1.10.0
         */
        includes(value: Value): boolean;

        /**
         * Returns a boolean indicating whether this ListValue is truthy.
         *
         * @returns A boolean indicating whether this ListValue is truthy.
         * @official
         * @since 1.10.0
         */
        isTruthy(): boolean;

        /**
         * Get the number of elements in this list.
         *
         * @returns the number of elements in this list.
         * @official
         * @since 1.10.0
         */
        length(): number;

        /**
         * Get the string representation of this ListValue.
         *
         * @returns The string representation of this ListValue.
         * @official
         * @since 1.10.0
         */
        toString(): string;
    }

    namespace ListValue {
        /**
         * Type.
         *
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link ListValue.type} instead.
         */
        var type__: string;
    }
}
