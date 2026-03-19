export {};

declare module 'obsidian' {
  /**
   * Load PDF.js and return a promise to the global pdfjsLib object.
   * Can also use {@link Window.pdfjsLib} after this promise resolves to get the same reference.
   *
   * @returns A promise that resolves to the global {@link Window.pdfjsLib} object.
   *
   * @remark For more specific return type, use:
   *
   * ```ts
   * import { loadPdfJs } from 'obsidian-typings/implementations';
   *
   * const pdfjsLib = await loadPdfJs();
   * ```
   *
   * @see {@link https://mozilla.github.io/pdf.js/ Official PDF.js documentation}.
   * @official
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required by official API for declaration merging.
  export function loadPdfJs(): Promise<any>;
}
