export {};

declare module 'obsidian' {
  /**
   * The event listener for the keymap.
   * Return `false` to automatically preventDefault.
   *
   * @deprecated - Added only for typing purposes. Use {@link KeymapEventListener} instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required by official API for declaration merging.
  type KeymapEventListener__ = (evt: KeyboardEvent, ctx: KeymapContext) => any | false;
}
