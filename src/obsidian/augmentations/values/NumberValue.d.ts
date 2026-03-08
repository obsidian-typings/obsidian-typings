export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a number.
     *
     * @since 1.10.0
     */
    interface NumberValue extends PrimitiveValue<number> {
    }

    namespace NumberValue {
        /**
         * Type.
         *
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link NumberValue.type} instead.
         */
        var type__: string;
    }
}
