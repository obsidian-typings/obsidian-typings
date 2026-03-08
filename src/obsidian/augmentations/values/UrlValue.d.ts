export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping an external link.
     *
     * @since 1.10.0
     */
    interface UrlValue extends StringValue {
    
        /**
         * Constructor.
         *
         * @param value - The value.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<UrlValue>` or `getUrlValueConstructor()` instead.
         */
        constructor__(value: string): this;
}
}
