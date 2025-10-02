export {};

declare module 'obsidian' {
    /**
     * Toggle option.
     *
     * @since 1.10.0
     */
    interface ToggleOption extends BaseOption {
        /**
         * Default value.
         *
         * @official
         * @since 1.10.0
         */
        default?: boolean;

        /**
             * Type.
             *
             * @since 1.10.0
             *
            @unofficial ERROR: Missing `@unofficial` or `@official` tag
             */
        type: 'toggle';
    }
}
