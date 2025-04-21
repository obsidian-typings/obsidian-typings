export {};

declare module 'obsidian' {
    /**
     * Information about the key combination.
     */
    interface KeymapInfo {
        /**
         * The main key of the keymap.
         *
         * @official
         */
        key: string | null;

        /**
         * The modifiers of the keymap.
         *
         * @official
         */
        modifiers: string | null;
    }
}
