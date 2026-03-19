export {};

declare module 'obsidian' {
  /**
   * Converts an `ArrayBuffer` to a hex string.
   *
   * @param buffer - The `ArrayBuffer` to convert.
   * @returns The hex string.
   *
   * @example
   * ```ts
   * console.log(arrayBufferToHex(new Uint8Array([1,2,3]).buffer)); // 010203
   * ```
   *
   * @official
   */

  export function arrayBufferToHex(data: ArrayBuffer): string;
}
