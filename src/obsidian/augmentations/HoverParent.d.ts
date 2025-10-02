export {};

declare module 'obsidian' {
    /**
     * A parent for hover links.
     * @since 0.11.13
     */
    interface HoverParent {
        /**
         * The hover popover.
         *
         * @official
         * @since 0.11.13
         */
        hoverPopover: HoverPopover | null;
    }
}
