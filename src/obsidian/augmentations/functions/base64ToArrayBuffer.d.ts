export {};

declare module 'obsidian' {
  /**
   * Converts a base64 string to an {@link ArrayBuffer}.
   *
   * @param base64 - The base64 string to convert.
   * @returns The {@link ArrayBuffer}.
   *
   * @example
   * ```ts
   * console.log(base64ToArrayBuffer('AQID'));
   * ```
   *
   * @official
   */

  export function base64ToArrayBuffer(base64: string): ArrayBuffer;
}
