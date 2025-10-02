export {};

declare module 'obsidian' {
    /**
     * Utility functions for rendering Values within the app.
     *
     * @since 1.10.0
     */
    interface RenderContext extends HoverParent {
        /**
         * Hover popover.
         *
         * @official
         * @since 1.10.0
         */
        hoverPopover: HoverPopover | null;
    }
}
