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
         */
        classes?: string[];

        /**
         * The delay of showing the tooltip in milliseconds.
         *
         * @official
         */
        delay?: number;

        /**
         * The gap of the tooltip in pixels.
         *
         * @official
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
