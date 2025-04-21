export {};

declare module 'obsidian' {
    /**
     * View state for the `open` action.
     */
    interface OpenViewState {
        /**
         * Whether the view is active.
         *
         * @official
         */
        active?: boolean;

        /**
         * The ephemeral state of the view.
         *
         * @official
         */
        eState?: Record<string, unknown>;

        /**
         * The group leaf of the view.
         *
         * @official
         */
        group?: WorkspaceLeaf;

        /**
         * The state of the view.
         *
         * @official
         */
        state?: Record<string, unknown>;
    }
}
