export {};

declare module 'obsidian' {
  /**
   * Converts an {@link ArrayBuffer} to a base64 string.
   *
   * @param buffer - The {@link ArrayBuffer} to convert.
   * @returns The base64 string.
   *
   * @example
   * ```ts
   * console.log(arrayBufferToBase64(new Uint8Array([1,2,3]).buffer)); // AQID
   * ```
   *
   * @official
   */

  export function arrayBufferToBase64(buffer: ArrayBuffer): string;
}
