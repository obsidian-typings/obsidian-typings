export {};

declare module 'obsidian' {
    /**
     * Text option.
     *
     * @since 1.10.0
     */
    interface TextOption extends BaseOption {
        /**
         * Default value.
         *
         * @official
         * @since 1.10.0
         */
        default?: string;

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
        type: 'text';
    }
}
