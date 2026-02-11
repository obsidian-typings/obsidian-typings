export {};

declare module 'obsidian' {
    /**
     * Collapsible container for other ViewOptions.
     *
     * @since 1.10.0
     */
    export interface BasesOptionGroup<T extends BasesOption> {
        /**
         * @public
         * @since 1.10.0
         * @unofficial ERROR: Missing `@unofficial` or `@official` tag
         */
        displayName: string;

        /**
         * @public
         * @since 1.10.0
         * @unofficial ERROR: Missing `@unofficial` or `@official` tag
         */
        items: T[];

        /**
         * If provided, the group will be hidden if the function returns true.
         *
         * @public
         * @since 1.10.2
         * @param config - Read-only copy of the current view configuration.
         * @unofficial ERROR: Missing `@unofficial` or `@official` tag
         */
        shouldHide?: () => boolean;

        /**
         * @public
         * @since 1.10.0
         * @unofficial ERROR: Missing `@unofficial` or `@official` tag
         */
        type: 'group';
    }
}
