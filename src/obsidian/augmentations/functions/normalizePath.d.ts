export {};

declare module 'obsidian' {
  /**
   * Normalizes a path replacing all invalid symbols.
   *
   * @param path - The path to normalize.
   * @returns The normalized path.
   *
   * @example
   * ```ts
   * normalizePath('foo/bar'); // foo/bar
   * normalizePath('/foo/bar'); // foo/bar
   * normalizePath('foo/bar/'); // foo/bar
   * normalizePath('foo//bar'); // foo/bar
   * normalizePath('foo\\bar'); // foo/bar
   * normalizePath('foo\u00A0bar'); // foo bar
   * normalizePath('foo\u202Fbar'); // foo bar
   * ```
   *
   * @official
   */

  export function normalizePath(path: string): string;
}
