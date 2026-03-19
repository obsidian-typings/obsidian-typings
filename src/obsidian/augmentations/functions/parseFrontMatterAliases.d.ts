export {};

declare module 'obsidian' {
  /**
   * Parses the frontmatter aliases from the frontmatter object.
   *
   * @param frontmatter - The frontmatter object.
   * @returns The aliases of the note or `null` if no aliases are found.
   *
   * @example
   * ```ts
   * console.log(parseFrontMatterAliases({ aliases: ['foo', 'bar'] })); // ['foo', 'bar']
   * console.log(parseFrontMatterAliases({ alias: ['foo', 'bar'] })); // ['foo', 'bar']
   * console.log(parseFrontMatterAliases({ aliases: 'baz' })); // ['baz']
   * ```
   *
   * @official
   */

  export function parseFrontMatterAliases(frontmatter: unknown): null | string[];
}
