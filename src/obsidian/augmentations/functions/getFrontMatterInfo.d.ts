export {};

declare module 'obsidian' {
  /**
   * Given the contents of a file, get information about the frontmatter of the file, including
   * whether there is a frontmatter block, the offsets of where it starts and ends, and the frontmatter text.
   *
   * @example
   * ```ts
   * const content = `---
   * key1: value1
   * key2: value2
   * ---
   * main content
   * `;
   * console.log(getFrontMatterInfo(content));
   * ```
   *
   * @official
   * @since 1.5.7
   */

  export function getFrontMatterInfo(content: string): FrontMatterInfo;
}
