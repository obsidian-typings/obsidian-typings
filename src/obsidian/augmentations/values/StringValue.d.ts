export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a string.
     *
     * @since 1.10.0
     */
    interface StringValue extends PrimitiveValue<string> {
    
        /**
         * Constructor.
         *
         * @param value - The value.
         * @returns The new instance.
         * To get the constructor, use `getStringValueConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         */
        constructor__(value: string): this;
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
