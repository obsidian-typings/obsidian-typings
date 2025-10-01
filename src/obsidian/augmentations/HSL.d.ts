export {};

declare module 'obsidian' {
    /**
     * Represents an HSL color.
     * @since 0.16.0
     */
    interface HSL {
        /**
         * Hue integer value between 0 and 360.
         *
         * @official
         * @since 0.16.0
         */
        h: number;

        /**
         * Lightness integer value between 0 and 100.
         *
         * @official
         * @since 0.16.0
         */
        l: number;

        /**
         * Saturation integer value between 0 and 100.
         *
         * @official
         * @since 0.16.0
         */
        s: number;
    }
}
