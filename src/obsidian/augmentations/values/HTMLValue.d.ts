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
         * To get the constructor, use `getHTMLValueConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         */
        constructor__(value: string): this;
}
}
