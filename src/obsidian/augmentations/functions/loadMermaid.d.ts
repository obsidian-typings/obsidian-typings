export {};

declare module 'obsidian' {
  /**
   * Load Mermaid and return a promise to the global mermaid object.
   * Can also use {@link Window.mermaid} after this promise resolves to get the same reference.
   *
   * @returns A promise that resolves to the global {@link Window.mermaid} object.
   *
   * @remark For more specific return type, use:
   *
   * ```ts
   * import { loadMermaid } from 'obsidian-typings/implementations';
   *
   * const mermaid = await loadMermaid();
   * ```
   *
   * @see {@link https://mermaid.js.org/ Official Mermaid documentation}.
   * @official
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required by official API for declaration merging.
  export function loadMermaid(): Promise<any>;
}
