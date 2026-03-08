export {};

declare module 'obsidian' {
    /**
     * A closeable component that can get dismissed via the Android 'back' button.
     */
    interface CloseableComponent {
        /**
         * Close the component.
         *
         * @official
         */
        close(): void;
    }
}
