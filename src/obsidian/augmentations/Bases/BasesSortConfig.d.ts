export {};

declare module 'obsidian' {
    /**
     * Bases sort config.
     *
     * @since 1.10.0
     */
    interface BasesSortConfig__ {
        /**
         * Direction.
         *
         * @official
         * @since 1.10.0
         */
        direction: 'ASC' | 'DESC';

        /**
         * Property.
         *
         * @official
         * @since 1.10.0
         */
        property: BasesPropertyId;
    }
}
