export {};

declare module 'obsidian' {
    /**
     * Options for the tooltip.
     */
    interface TooltipOptions {
        /**
         * The classes of the tooltip.
         *
         * @official
         * @since 1.8.7
         */
        classes?: string[];

        /**
         * The delay of showing the tooltip in milliseconds.
         *
         * @official
         * @since 1.4.11
         */
        delay?: number;

        /**
         * The gap of the tooltip in pixels.
         *
         * @official
         * @since 1.8.7
         */
        gap?: number;

        /**
         * The placement of the tooltip.
         *
         * @official
         */
        placement?: TooltipPlacement;
    }
}
