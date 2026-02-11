export {};

declare module 'obsidian' {
    /**
     * Bases option.
     *
     * @since 1.10.0
     */
    interface BasesOption {
        /**
         * Display name.
         *
         * @official
         * @since 1.10.0
         */
        displayName: string;

        /**
         * Key.
         *
         * @official
         * @since 1.10.0
         */
        key: string;

        /**
         * If provided, the option will be hidden if the function returns true.
         *
         * @param config - Read-only copy of the current view configuration.
         * @returns `true` if the option should be hidden, false otherwise.
         * @official
         * @since 1.10.2
         */
        shouldHide?: () => boolean;

        /**
         * Type
         * @official
         * @since 1.10.0
         */
        type: string;
    }
}
