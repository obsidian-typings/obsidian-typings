export {};

declare module 'obsidian' {
    /**
     * A definition for the position of the menu.
     * @since 1.1.0
     */
    interface MenuPositionDef {
        /**
         * Whether the menu should be aligned to the left.
         *
         * @official
         */
        left?: boolean;

        /**
         * Whether the menu should overlap the position.
         *
         * @official
         */
        overlap?: boolean;

        /**
         * The width of the menu.
         *
         * @official
         */
        width?: number;

        /**
         * The x position of the menu.
         *
         * @official
         */
        x: number;

        /**
         * The y position of the menu.
         *
         * @official
         */
        y: number;
    }
}
