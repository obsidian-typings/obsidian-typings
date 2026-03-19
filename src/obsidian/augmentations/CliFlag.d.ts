export {};

declare module 'obsidian' {
  /**
   * The data passed to the CLI.
   *
   * @since 1.12.2
   */
  export interface CliFlag {
    /**
     * Description shown in help and autocomplete
     *
     * @official
     * @since 1.12.2
     */
    description: string;

    /**
     * Whether this flag is required (default: `false`)
     *
     * @official
     * @since 1.12.2
     */
    required?: boolean;

    /**
     * Value placeholder (e.g., '<filename>', '<path>'). Omit for boolean flags.
     *
     * @official
     * @since 1.12.2
     */
    value?: string;
  }
}
