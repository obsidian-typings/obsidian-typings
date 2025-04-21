export {};

declare module 'obsidian' {
    /**
     * Context of the keymap.
     */
    interface KeymapContext extends KeymapInfo {
        /**
         * Interpreted virtual key.
         *
         * @official
         */
        vkey: string;
    }
}
