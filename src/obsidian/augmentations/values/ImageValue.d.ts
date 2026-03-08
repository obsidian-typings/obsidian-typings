export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a path to an image resource in the vault.
     *
     * @since 1.10.0
     */
    interface ImageValue extends StringValue {
    
        /**
         * Constructor.
         *
         * @param value - The value.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<ImageValue>` or `getImageValueConstructor()` instead.
         */
        constructor__(value: string): this;
}
}
