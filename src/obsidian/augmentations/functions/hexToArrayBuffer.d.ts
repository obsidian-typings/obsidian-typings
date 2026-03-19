export {};

declare module 'obsidian' {
  /**
   * Converts a hex string to an ArrayBuffer.
   *
   * @param hex - The hex string to convert.
   * @returns The ArrayBuffer.
   *
   * @example
   * ```ts
   * console.log(hexToArrayBuffer('00112233445566778899aabbccddeeff'));
   * ```
   *
   * @official
   */

  export function hexToArrayBuffer(hex: string): ArrayBuffer;
}
