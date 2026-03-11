export {};

declare module 'obsidian' {
  /**
   * Parses a frontmatter entry from the frontmatter object.
   *
   * @param frontmatter - The frontmatter object.
   * @param key - The key to parse.
   * @returns The parsed entry or `null` if the key is not found.
   *
   * @example
   * ```ts
   * console.log(parseFrontMatterEntry({ foo: 'bar' }, 'foo')); // bar
   * console.log(parseFrontMatterEntry({ baz: 'qux' }, /ba./)); // qux
   * ```
   *
   * @official
   */

  export function parseFrontMatterEntry(frontmatter: unknown, key: RegExp | string): unknown;
}
