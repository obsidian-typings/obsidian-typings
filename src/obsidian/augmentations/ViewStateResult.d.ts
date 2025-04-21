export {};

declare module 'obsidian' {
    /**
     * The result of the view state.
     */
    interface ViewStateResult {
        /**
         * Set this to `true` to indicate that there is a state change which should be recorded in the navigation history.
         *
         * @official
         */
        history: boolean;
    }
}
