export {};

declare module 'obsidian' {
  /**
   * Converts the linktext to a linkpath.
   *
   * @param linktext A wikilink without the leading [[ and trailing ]].
   * @returns the name of the file that is being linked to.
   *
   * @example
   * ```ts
   * console.log(getLinkpath('foo#bar')); // foo
   * ```
   *
   * @official
   */

  export function getLinkpath(linktext: string): string;
}
