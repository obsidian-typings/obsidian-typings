export {};

declare module 'obsidian' {
    /**
     * Multitext option.
     *
     * @since 1.10.0
     */
    interface BasesMultitextOption extends BasesOption {
        /**
         * Default value.
         *
         * @official
         * @since 1.10.0
         */
        default?: string[];

        /**
         * Type.
         *
         * @official
         * @since 1.10.0
         */
        type: 'multitext';
    }
}
