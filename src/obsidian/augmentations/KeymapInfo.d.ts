export {};

declare module 'obsidian' {
  /**
   * Information about the key combination.
   * @since 0.10.4
   */
  interface KeymapInfo {
    /**
     * The main key of the keymap.
     *
     * @official
     * @since 0.10.4
     */
    key: null | string;

    /**
     * The modifiers of the keymap.
     *
     * @official
     * @since 0.10.4
     */
    modifiers: null | string;
  }
}
