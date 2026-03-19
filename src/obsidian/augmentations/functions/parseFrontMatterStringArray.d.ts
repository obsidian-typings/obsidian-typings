export {};

declare module 'obsidian' {
  /**
   * Parses a frontmatter string array from the frontmatter object.
   *
   * @param frontmatter - The frontmatter object.
   * @param key - The key to parse.
   * @returns The parsed entry or `null` if the key is not found.
   *
   * @example
   * ```ts
   * console.log(parseFrontMatterStringArray({ foo: ['bar', 'baz'] }, 'foo')); // ['bar', 'baz']
   * console.log(parseFrontMatterStringArray({ foo: 'bar,baz' }, 'foo')); // ['bar', 'baz']
   * console.log(parseFrontMatterStringArray({ foo: 'bar\nbaz' }, 'foo')); // ['bar', 'baz']
   * console.log(parseFrontMatterStringArray({ foo: 'bar baz' }, 'foo')); // ['bar baz']
   * console.log(parseFrontMatterStringArray({ foo: 'bar baz' }, 'foo')); // ['bar baz']
   * console.log(parseFrontMatterStringArray({ foo: 'bar baz' }, 'foo')); // ['bar', 'baz']
   * console.log(parseFrontMatterStringArray({ foo: ['bar', 'baz'] }, /fo./)); // ['bar', 'baz']
   * ```
   *
   * @official
   */

  export function parseFrontMatterStringArray(
    frontmatter: unknown,
    key: RegExp | string
  ): null | string[];
}
