export {};

declare module 'obsidian' {
    /**
     * The context of the markdown post processor.
     */
    interface MarkdownPostProcessorContext {
        /**
         * The ID of the document.
         *
         * @official
         */
        docId: string;

        /**
         * The frontmatter of the document.
         *
         * @official
         */
        frontmatter: any | null | undefined;

        /**
         * The path to the associated file. Any links are assumed to be relative to the `sourcePath`.
         *
         * @official
         */
        sourcePath: string;

        /**
         * Adds a child component that will have its lifecycle managed by the renderer.
         *
         * Use this to add a dependent child to the renderer such that if the containerEl
         * of the child is ever removed, the component's unload will be called.
         *
         * @param child - The child component to add.
         * @official
         */
        addChild(child: MarkdownRenderChild): void;

        /**
         * Gets the section information of this element at this point in time.
         * Only call this function right before you need this information to get the most up-to-date version.
         * This function may also return `null` in many circumstances; if you use it, you must be prepared to deal with `null`s.
         *
         * @param el - The element to get the section information from.
         * @returns The section information or `null` if no section information is available.
         * @official
         */
        getSectionInfo(el: HTMLElement): MarkdownSectionInformation | null;
    }
}
