export {};

declare module 'obsidian' {
    /**
     * A text component.
     * @since 0.9.21
     */
    interface TextComponent extends AbstractTextComponent<HTMLInputElement> {
        /**
         * Create a new text component.
         *
         * @param containerEl - The container element.
         * @returns The text component instance.
         * To get the constructor, use `getTextComponentConstructor()` from `obsidian-typings/implementations`.
         * @official
         * @deprecated - Added only for typing purposes.
         */
        constructor__(containerEl: HTMLElement): this;
    }
}
