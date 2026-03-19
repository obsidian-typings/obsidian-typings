export {};

declare module 'obsidian' {
  /**
   * Converts a Blob to an ArrayBuffer.
   *
   * @param blob - The Blob to convert.
   * @returns The ArrayBuffer.
   *
   * @example
   * ```ts
   * console.log(await getBlobArrayBuffer(blob));
   * ```
   *
   * @official
   */

  export function getBlobArrayBuffer(blob: Blob): Promise<ArrayBuffer>;
}
