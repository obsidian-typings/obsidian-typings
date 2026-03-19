export {};

declare module 'obsidian' {
  /**
   * Parses the frontmatter tags from the frontmatter object.
   *
   * @param frontmatter - The frontmatter object.
   * @returns The tags of the note or `null` if no tags are found.
   *
   * @example
   * ```ts
   * console.log(parseFrontMatterTags({ tags: ['foo', 'bar'] })); // ['#foo', '#bar']
   * console.log(parseFrontMatterTags({ tag: ['foo', 'bar'] })); // ['#foo', '#bar']
   * console.log(parseFrontMatterTags({ tags: 'foo bar' })); // ['#foo', '#bar']
   * ```
   *
   * @official
   */

  export function parseFrontMatterTags(frontmatter: unknown): null | string[];
}
