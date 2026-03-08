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
         * To get the constructor, use `getBooleanValueConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
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
