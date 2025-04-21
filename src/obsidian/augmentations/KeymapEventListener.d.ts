export {};

declare module 'obsidian' {
    /**
     * The event listener for the keymap.
     * Return `false` to automatically preventDefault.
     *
     * @deprecated - Added only for typing purposes. Use {@link KeymapEventListener} instead.
     */
    type KeymapEventListener__ = (evt: KeyboardEvent, ctx: KeymapContext) => false | any;
}
