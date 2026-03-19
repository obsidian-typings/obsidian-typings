export {};

declare module 'obsidian' {
  /**
   * A map of CLI flags.
   *
   * @deprecated - Added only for typing purposes. Use {@link CliFlag} instead.
   * @since 1.12.2
   */
  type CliFlags__ = Record<string, CliFlag>;
}
