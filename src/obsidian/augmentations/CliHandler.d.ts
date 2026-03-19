export {};

declare module 'obsidian' {
  /**
   * A function that handles CLI commands.
   *
   * @deprecated - Added only for typing purposes. Use {@link CliHandler} instead.
   * @since 1.12.2
   */
  type CliHandler__ = (params: CliData) => Promise<string> | string;
}
