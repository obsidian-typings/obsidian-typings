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
         * To get the constructor, use `getUrlValueConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         */
        constructor__(value: string): this;
}
}
