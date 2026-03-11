export {};

declare module 'obsidian' {
  /**
   * Normalizes headings for link matching by stripping out special characters and shrinking consecutive spaces.
   *
   * @param heading - The heading to normalize.
   * @returns The normalized heading.
   *
   * @example
   * ```ts
   * console.log(stripHeading('foo!"#$%&()*+,.:;<=>?@^`{|}~\/\[\]\\\r\nbar')); // foo bar
   * ```
   *
   * @official
   */

  export function stripHeading(heading: string): string;
}
