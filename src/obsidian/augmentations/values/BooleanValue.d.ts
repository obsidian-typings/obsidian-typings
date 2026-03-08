export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a boolean.
     *
     * @since 1.10.0
     */
    interface BooleanValue extends PrimitiveValue<boolean> {
    
        /**
         * Constructor.
         *
         * @param value - The value.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<BooleanValue>` or `getBooleanValueConstructor()` instead.
         */
        constructor__(value: boolean): this;
}

    namespace BooleanValue {
        /**
         * Type.
         *
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link BooleanValue.type} instead.
         */
        var type__: string;
    }
}
