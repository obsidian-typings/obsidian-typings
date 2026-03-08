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
         * To get the constructor, use `getImageValueConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         */
        constructor__(value: string): this;
}
}
