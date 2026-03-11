export {};

declare module 'obsidian' {
  /**
   * Load Prism.js and return a promise to the global Prism object.
   * Can also use {@link Window.Prism} after this promise resolves to get the same reference.
   *
   * @returns A promise that resolves to the global {@link Window.Prism} object.
   *
   * @remark For more specific return type, use:
   *
   * ```ts
   * import { loadPrism } from 'obsidian-typings/implementations';
   *
   * const Prism = await loadPrism();
   * ```
   *
   * @see {@link https://prismjs.com/ Official Prism documentation}.
   * @official
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required by official API for declaration merging.
  export function loadPrism(): Promise<any>;
}
