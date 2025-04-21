export {};

declare module 'obsidian' {
    /**
     * The object stored in the view plugin {@link livePreviewState}
     */
    interface LivePreviewStateType {
        /**
         * Whether the left mouse is currently held down in the editor.
         * (for example, when drag-to-select text).
         *
         * @official
         */
        mousedown: boolean;
    }
}
