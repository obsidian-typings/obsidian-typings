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
         * To get the constructor instance, use {@link getUrlValueConstructor} from `obsidian-typings/implementations`.
         *
         * @param value - The value.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(value: string): this;
}
}
