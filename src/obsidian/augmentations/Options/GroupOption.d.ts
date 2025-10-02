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
         * Type.
         *
         * @official
         * @since 1.10.0
         */
        type: 'group';
    }
}
