export {};

declare module 'obsidian' {
    /**
     * A parsed version of the {@link BasesPropertyId}.
     *
     * @since 1.10.0
     */
    interface BasesProperty {
        /**
         * Name.
         *
         * @official
         * @since 1.10.0
         */
        name: string;

        /**
         * Type.
         *
         * @official
         * @since 1.10.0
         */
        type: BasesPropertyType;
    }
}
