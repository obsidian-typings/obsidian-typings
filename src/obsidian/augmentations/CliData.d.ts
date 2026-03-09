export {};

declare module 'obsidian' {
  /**
   * The data passed to the CLI.
   *
   * @since 1.12.2
   */
  export interface CliData extends Record<string, string | 'true'> {
  }
}
