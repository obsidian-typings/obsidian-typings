export {};

declare module 'obsidian' {
  /**
   * Prepares headings for linking by stripping out some bad combinations of special characters that could break links.
   *
   * @param heading - The heading to prepare.
   * @returns The prepared heading.
   *
   * @example
   * ```ts
   * console.log(stripHeadingForLink('foo:#|^\\\r\n%%[[]]bar')); // foo bar
   * ```
   *
   * @official
   */

  export function stripHeadingForLink(heading: string): string;
}
