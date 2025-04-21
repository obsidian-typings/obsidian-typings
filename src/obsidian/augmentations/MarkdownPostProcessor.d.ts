export {};

declare module 'obsidian' {
    /**
     * A post processor receives an element which is a section of the preview.
     *
     * Post processors can mutate the DOM to render various things, such as mermaid graphs, latex equations, or custom controls.
     *
     * If your post processor requires lifecycle management, for example, to clear an interval, kill a subprocess, etc when this element is
     * removed from the app, look into {@link MarkdownPostProcessorContext.addChild}
     */
    interface MarkdownPostProcessor {
        /**
         * The processor function itself.
         *
         * @official
         */
        (el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<any> | void;

        /**
         * An optional integer sort order. Defaults to 0. Lower number runs before higher numbers.
         *
         * @official
         */
        sortOrder?: number;
    }
}
