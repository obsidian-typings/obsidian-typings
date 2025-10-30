export {};

declare module 'obsidian' {
    /**
     * Collapsible container for other ViewOptions.
     *
     * @since 1.10.0
     */
    interface GroupOption {
        /**
         * Display name.
         *
         * @official
         * @since 1.10.0
         */
        displayName: string;

        /**
         * Items.
         *
         * @official
         * @since 1.10.0
         */
        items: Exclude<ViewOption, GroupOption>[];

        /**
         * If provided, the group will be hidden if the function returns true.
         *
         * @param config - Read-only copy of the current view configuration.
         * @returns `true` if the group should be hidden, `false` otherwise.
         * @official
         * @since 1.10.2
         */
        shouldHide?: (config: BasesViewConfig) => boolean;

        /**
         * Type.
         *
         * @official
         * @since 1.10.0
         */
        type: 'group';
    }
}
