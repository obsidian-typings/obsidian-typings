export {};

declare module 'obsidian' {
    /**
     * Represents a point in a 2D coordinate system.
     */
    interface Point {
        /**
         * The x coordinate.
         *
         * @official
         */
        x: number;

        /**
         * The y coordinate.
         *
         * @official
         */
        y: number;
    }
}
