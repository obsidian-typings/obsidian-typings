export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a renderable icon.
     *
     * @since 1.10.0
     */
    interface IconValue extends StringValue {
    
        /**
         * Constructor.
         *
         * @param value - The value.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<IconValue>` or `getIconValueConstructor()` instead.
         */
        constructor__(value: string): this;
}
}
