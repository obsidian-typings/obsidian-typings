export {};

declare module 'obsidian' {
    /**
     * A hotkey.
     *
     * @example
     * ```ts
     * const hotkey: Hotkey = { modifiers: ['Mod'], key: 'a' };
     * ```
     */
    interface Hotkey {
        /**
         * The main key of the hotkey.
         *
         * @example
         * ```ts
         * console.log(hotkey.key); // a
         * ```
         * @official
         */
        key: string;

        /**
         * The modifiers of the hotkey.
         *
         * @example
         * ```ts
         * console.log(hotkey.modifiers); // ['Mod']
         * ```
         * @official
         */
        modifiers: Modifier[];
    }
}
