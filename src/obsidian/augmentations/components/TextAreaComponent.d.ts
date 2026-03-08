export {};

declare module 'obsidian' {
    /**
     * A text area component.
     * @since 0.9.7
     */
    interface TextAreaComponent extends AbstractTextComponent<HTMLTextAreaElement> {
        /**
         * Create a new text area component.
         *
         * @param containerEl - The container element.
         * @returns The text area component instance.
         * To get the constructor, use `getTextAreaComponentConstructor()` from `obsidian-typings/implementations`.
         * @official
         * @deprecated - Added only for typing purposes.
         */
        constructor__(containerEl: HTMLElement): this;
    }
}
