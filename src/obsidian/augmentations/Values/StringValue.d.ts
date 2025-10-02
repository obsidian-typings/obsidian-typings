export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a string.
     *
     * @since 1.10.0
     */
    interface StringValue extends PrimitiveValue<string> {
    }

    namespace StringValue {
        /**
         * Type.
         *
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link StringValue.type} instead.
         */
        var type__: string;
    }
}
