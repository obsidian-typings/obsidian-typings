export {};

declare module 'obsidian' {
    /**
     * Event handler for the keymap.
     */
    interface KeymapEventHandler extends KeymapInfo {
        /**
         * The scope of the keymap.
         *
         * @official
         */
        scope: Scope;
    }
}
