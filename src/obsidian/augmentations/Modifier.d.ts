export {};

declare module 'obsidian' {
    /**
     * Mod = Cmd on MacOS and Ctrl on other OS
     * Ctrl = Ctrl key for every OS
     * Meta = Cmd on MacOS and Win key on other OS
     *
     * @deprecated - Added only for typing purposes. Use {@link Modifier} instead.
     */
    type Modifier__ = 'Mod' | 'Ctrl' | 'Meta' | 'Shift' | 'Alt';
}
