export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping an Obsidian tag.
     *
     * @since 1.10.0
     */
    interface TagValue extends StringValue {
        /**
         * Constructor.
         *
         * @param value - The value to wrap.
         * @returns The new TagValue.
         * To get the constructor, use `getTagValueConstructor()` from `obsidian-typings/implementations`.
         * @official
         * @since 1.10.0
         */
        constructor__(value: string): this;
    }
}
