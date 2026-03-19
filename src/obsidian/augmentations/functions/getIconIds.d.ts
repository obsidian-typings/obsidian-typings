export {};

declare module 'obsidian' {
  /**
   * Get the list of registered icons.
   *
   * @official
   */

  export function getIconIds(): IconName[];
}
