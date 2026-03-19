import type { CachedMetadata } from 'obsidian';

export {};

declare module 'obsidian' {
  /**
   * Combines all tags from frontmatter and note content into a single array.
   *
   * @example
   * For the following note:
   *
   * ```markdown
   * ---
   * tags:
   *   - foo
   *   - bar
   * ---
   *
   * #baz
   * ```
   *
   * Usage:
   *
   * ```ts
   * console.log(getAllTags(cache)); // ['foo', 'bar', 'baz']
   * ```
   *
   * @official
   */

  export function getAllTags(cache: CachedMetadata): null | string[];
}
