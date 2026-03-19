import type { ParsedLinktext } from '../../internals/ParsedLinktext.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Parses the linktext of a wikilink into its component parts.
   *
   * @param linktext A wikilink without the leading [[ and trailing ]].
   * @returns filepath and subpath (subpath can refer either to a block id, or a heading).
   *
   * @example
   * ```ts
   * console.log(parseLinktext('[[foo]]')); // { path: 'foo', subpath: '' }
   * console.log(parseLinktext('[[foo#bar]]')); // { path: 'foo', subpath: 'bar' }
   * ```
   *
   * @official
   */

  export function parseLinktext(linktext: string): ParsedLinktext;
}
