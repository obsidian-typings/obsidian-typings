export {};

declare module 'obsidian' {
    /**
     * A text area component.
     */
    interface TextAreaComponent extends AbstractTextComponent<HTMLTextAreaElement> {
        /**
         * Create a new text area component.
         *
         * @param containerEl - The container element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;
    }
}
