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
    
        /**
         * Constructor.
         *
         * @param app - The app.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<RenderContext>` or `getRenderContextConstructor()` instead.
         */
        constructor__(app: App): this;
}
}
