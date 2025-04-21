export {};

declare module 'obsidian' {
    /**
     * A component to register as a child component for the markdown preview.
     */
    interface MarkdownRenderChild extends Component {
        /**
         * The container element of the markdown render child.
         *
         * @official
         */
        containerEl: HTMLElement;

        /**
         * Create a new markdown render child.
         *
         * @param containerEl - This HTMLElement will be used to test whether this component is still alive.
         * It should be a child of the Markdown preview sections, and when it's no longer attached
         * (for example, when it is replaced with a new version because the user edited the Markdown source code),
         * this component will be unloaded.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;
    }
}
