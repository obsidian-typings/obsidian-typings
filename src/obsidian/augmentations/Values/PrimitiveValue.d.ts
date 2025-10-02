export {};

declare module 'obsidian' {
    /**
     * Base type for {@link Values} which wrap a single primitive.
     *
     * @since 1.10.0
     */
    interface PrimitiveValue<T> extends NotNullValue {
        /**
         * Constructor.
         *
         * @param value - The value to wrap.
         * @returns The new PrimitiveValue.
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link PrimitiveValue.constructor} instead.
         */
        constructor__(value: T): this;

        /**
         * Returns a boolean indicating whether this PrimitiveValue is truthy.
         *
         * @returns A boolean indicating whether this PrimitiveValue is truthy.
         * @official
         * @since 1.10.0
         */
        isTruthy(): boolean;

        /**
         * Get the string representation of this PrimitiveValue.
         *
         * @returns The string representation of this PrimitiveValue.
         * @official
         * @since 1.10.0
         */
        toString(): string;
    }
}
