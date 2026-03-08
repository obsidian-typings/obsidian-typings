export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a number.
     *
     * @since 1.10.0
     */
    interface NumberValue extends PrimitiveValue<number> {
    
        /**
         * Constructor.
         *
         * @param value - The value.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<NumberValue>` or `getNumberValueConstructor()` instead.
         */
        constructor__(value: number): this;
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
