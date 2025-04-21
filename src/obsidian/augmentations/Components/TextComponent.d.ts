export {};

declare module 'obsidian' {
    /**
     * A text component.
     */
    interface TextComponent extends AbstractTextComponent<HTMLInputElement> {
        /**
         * Create a new text component.
         *
         * @param containerEl - The container element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;
    }
}
