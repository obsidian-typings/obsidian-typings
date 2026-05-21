export {};

declare module 'obsidian' {
  /**
   * Converts an {@link ArrayBuffer} to a hex string.
   *
   * @param buffer - The {@link ArrayBuffer} to convert.
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
