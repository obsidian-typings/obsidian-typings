export {};

declare module 'obsidian' {
    /**
     * A color in RGB format.
     * @since 0.16.0
     */
    interface RGB {
        /**
         * Blue integer value between 0 and 255.
         *
         * @official
         */
        b: number;

        /**
         * Green integer value between 0 and 255.
         *
         * @official
         */
        g: number;

        /**
         * Red integer value between 0 and 255.
         *
         * @official
         */
        r: number;
    }
}
