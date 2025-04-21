export {};

declare module 'obsidian' {
    /**
     * Represents an HSL color.
     */
    interface HSL {
        /**
         * Hue integer value between 0 and 360.
         *
         * @official
         */
        h: number;

        /**
         * Lightness integer value between 0 and 100.
         *
         * @official
         */
        l: number;

        /**
         * Saturation integer value between 0 and 100.
         *
         * @official
         */
        s: number;
    }
}
