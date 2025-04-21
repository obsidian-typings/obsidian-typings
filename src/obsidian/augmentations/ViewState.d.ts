export {};

declare module 'obsidian' {
    /**
     * The state of the view.
     */
    interface ViewState {
        /**
         * Whether the view is active.
         *
         * @official
         */
        active?: boolean;

        /**
         * The leaf group of the view.
         *
         * @official
         */
        group?: WorkspaceLeaf;

        /**
         * Whether the view is pinned.
         *
         * @official
         */
        pinned?: boolean;

        /**
         * The state of the view.
         *
         * @official
         */
        state?: Record<string, unknown>;

        /**
         * The type of the view.
         *
         * @official
         */
        type: string;
    }
}
