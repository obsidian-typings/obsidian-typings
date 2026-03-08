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
         * To get the constructor, use `getIconValueConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         */
        constructor__(value: string): this;
}
}
