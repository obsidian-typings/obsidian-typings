export {};

declare module 'obsidian' {
  /**
   * Bases option.
   *
   * @since 1.10.0
   */
  interface BasesOption {
    /**
     * Display name.
     *
     * @official
     * @since 1.10.0
     */
    displayName: string;

    /**
     * Key.
     *
     * @official
     * @since 1.10.0
     */
    key: string;

    /**
     * Type
     *
     * @official
     * @since 1.10.0
     */
    type: string;

    /**
     * If provided, the option will be hidden if the function returns `true`.
     *
     * @returns Whether the option should be hidden.
     *
     * @official
     * @since 1.10.2
     * @deprecated - Added only for typing purposes. Use {@link BasesOption.shouldHide} instead.
     */
    shouldHide__?(): boolean;
  }
}
