export {};

declare module 'obsidian' {
  /**
   * Load MathJax.
   *
   * @returns A promise that resolves when MathJax is loaded.
   *
   * @see {@link https://www.mathjax.org/ Official MathJax documentation}.
   * @official
   */

  export function loadMathJax(): Promise<void>;
}
