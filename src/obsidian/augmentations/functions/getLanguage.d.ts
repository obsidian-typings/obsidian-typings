export {};

declare module 'obsidian' {
  /**
   * Get the ISO code for the currently configured app language. Defaults to 'en'.
   * See {@link https://github.com/obsidianmd/obsidian-translations?tab=readme-ov-file#existing-languages} for list of options.
   *
   * @official
   * @since 1.8.7
   */

  export function getLanguage(): string;
}
