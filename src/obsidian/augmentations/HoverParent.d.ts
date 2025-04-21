export {};

declare module 'obsidian' {
    /**
     * A parent for hover links.
     */
    interface HoverParent {
        /**
         * The hover popover.
         *
         * @official
         */
        hoverPopover: HoverPopover | null;
    }
}
