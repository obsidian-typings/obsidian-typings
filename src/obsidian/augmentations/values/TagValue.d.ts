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
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link TagValue.constructor} instead.
         */
        constructor__(value: string): this;
    }
}
