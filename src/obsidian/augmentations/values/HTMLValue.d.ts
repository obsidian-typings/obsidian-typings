export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping raw HTML.
     *
     * @since 1.10.0
     */
    interface HTMLValue extends StringValue {
    
        /**
         * Constructor.
         *
         * @param value - The value.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<HTMLValue>` or `getHTMLValueConstructor()` instead.
         */
        constructor__(value: string): this;
}
}
