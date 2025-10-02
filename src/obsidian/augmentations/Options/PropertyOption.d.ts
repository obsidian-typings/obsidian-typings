export {};

declare module 'obsidian' {
    /**
     * A dropdown menu allowing selection of a property.
     *
     * @since 1.10.0
     */
    interface PropertyOption extends BaseOption {
        /**
         * Default value.
         *
         * @official
         * @since 1.10.0
         */
        default?: string;

        /**
         * If provided, only properties which pass the filter will be included for selection in the property dropdown.
         *
         * @param prop - The property to filter.
         * @returns A boolean indicating whether the property should be included.
         * @official
         * @since 1.10.0
         */
        filter?: (prop: BasesPropertyId) => boolean;

        /**
         * Placeholder.
         *
         * @official
         * @since 1.10.0
         */
        placeholder?: string;

        /**
         * Type.
         *
         * @official
         * @since 1.10.0
         */
        type: 'property';
    }
}
