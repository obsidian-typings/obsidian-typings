export {};

declare module 'obsidian' {
    /**
     * Dropdown option.
     *
     * @since 1.10.0
     */
    interface DropdownOption extends BaseOption {
        /**
         * Default value.
         *
         * @official
         * @since 1.10.0
         */
        default?: string;

        /**
         * Options.
         *
         * @official
         * @since 1.10.0
         */
        options: Record<string, string>;

        /**
         * Type.
         *
         * @official
         * @since 1.10.0
         */
        type: 'dropdown';
    }
}
