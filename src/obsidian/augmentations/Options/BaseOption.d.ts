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
    }
}
