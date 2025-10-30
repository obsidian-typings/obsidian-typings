export {};

declare module 'obsidian' {
    /**
     * Base option.
     *
     * @since 1.10.0
     */
    export interface BaseOption {
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
         * Type
         * @official
         * @since 1.10.0
         */
        type: string;

        /**
         * If provided, the option will be hidden if the function returns true.
         *
         * @param config - Read-only copy of the current view configuration.
         * @returns `true` if the option should be hidden, false otherwise.
         * @official
         * @since 1.10.2
         */
        shouldHide?(config: BasesViewConfig): boolean;
    }
}
