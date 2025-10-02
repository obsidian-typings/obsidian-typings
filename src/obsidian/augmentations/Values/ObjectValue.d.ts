export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping an object.
     *
     * @since 1.10.0
     */
    interface ObjectValue extends NotNullValue {
        /**
         * Get the {@link Value} associated with the provided key, or {@link NullValue}.
         * If the referenced property in the object is not a Value, it will be wrapped before returning.
         *
         * @param key - The key to get the value from.
         * @returns The {@link Value} associated with the provided key, or {@link NullValue}.
         * @official
         * @since 1.10.0
         */
        get(key: string): Value | null;

        /**
         * Returns a boolean indicating whether this ObjectValue is empty.
         *
         * @returns A boolean indicating whether this ObjectValue is empty.
         * @official
         * @since 1.10.0
         */
        isEmpty(): boolean;

        /**
         * Returns a boolean indicating whether this ObjectValue is truthy.
         *
         * @returns A boolean indicating whether this ObjectValue is truthy.
         * @official
         * @since 1.10.0
         */
        isTruthy(): boolean;

        /**
         * Get the string representation of this ObjectValue.
         *
         * @returns The string representation of this ObjectValue.
         * @official
         * @since 1.10.0
         */
        toString(): string;
    }

    namespace ObjectValue {
        /**
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link ObjectValue.type} instead.
         */
        var type__: string;
    }
}
