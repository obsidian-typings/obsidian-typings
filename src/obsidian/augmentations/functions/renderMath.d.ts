export {};

declare module 'obsidian' {
  /**
   * Render some LaTeX math using the MathJax engine. Returns an HTMLElement.
   * Requires calling `finishRenderMath` when rendering is all done to flush the MathJax stylesheet.
   *
   * @param source - The LaTeX source code.
   * @param display - Whether to render the math in display mode.
   * @returns The rendered math element.
   *
   * @example
   * ```ts
   * console.log(renderMath('\\frac{1}{2}', true));
   * ```
   *
   * @official
   */

  export function renderMath(source: string, display: boolean): HTMLElement;
}
