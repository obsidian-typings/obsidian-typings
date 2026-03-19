export {};

declare module 'obsidian' {
  /**
   * Flush the MathJax stylesheet.
   *
   * @official
   */

  export function finishRenderMath(): Promise<void>;
}
