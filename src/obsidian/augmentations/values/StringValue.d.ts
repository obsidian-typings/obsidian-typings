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
         * To get the constructor instance, use {@link getStringValueConstructor} from `obsidian-typings/implementations`.
         *
         * @param value - The value.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes.
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
