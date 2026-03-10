import type { ExtendedMetrics } from './ExtendedMetrics.d.ts';

/**
 * MathJax library interface for rendering LaTeX math expressions.
 * @public
 * @unofficial
 */
export interface MathJax {
  /** MathJax configuration object. */
  config: unknown;

  /** MathJax component loader. */
  loader: unknown;

  /** MathJax runtime options. */
  options: unknown;

  /** MathJax library version string. */
  version: string;

  /**
   * Get the CHTML stylesheet element for MathJax-rendered content.
   *
   * @returns The stylesheet element.
   */
  chtmlStylesheet(): HTMLStyleElement;

  /**
   * Get font metrics for a given DOM node, used for scaling math output.
   *
   * @param node - DOM node to get metrics for.
   * @param display - Whether display mode is enabled.
   * @returns Font metrics for the node.
   */
  getMetricsFor(node: HTMLElement, display?: boolean): ExtendedMetrics;

  /**
   * Convert a TeX string to a CHTML (HTML) element synchronously.
   *
   * @param math - TeX string to convert.
   * @param options - Optional rendering options.
   * @returns The rendered HTML element.
   */
  tex2chtml(math: string, options?: Record<string, unknown>): HTMLElement;

  /**
   * Convert a TeX string to a CHTML (HTML) element asynchronously.
   *
   * @param math - TeX string to convert.
   * @param options - Optional rendering options.
   * @returns The rendered HTML element.
   */
  tex2chtmlPromise(math: string, options?: Record<string, unknown>): Promise<HTMLElement>;

  /**
   * Convert a TeX string to MathML markup synchronously.
   *
   * @param math - TeX string to convert.
   * @param options - Optional rendering options.
   * @returns The MathML markup string.
   */
  tex2mml(math: string, options?: Record<string, unknown>): string;

  /**
   * Convert a TeX string to MathML markup asynchronously.
   *
   * @param math - TeX string to convert.
   * @param options - Optional rendering options.
   * @returns The MathML markup string.
   */
  tex2mmlPromise(math: string, options?: Record<string, unknown>): Promise<string>;

  /** Reset the TeX input jax, clearing equation numbering and labels. */
  texReset(): void;

  /**
   * Typeset math expressions in the given elements synchronously.
   *
   * @param elements - The elements to typeset.
   */
  typeset(elements?: null | unknown[]): void;

  /**
   * Clear typeset math from the given elements.
   *
   * @param elements - The elements to clear.
   */
  typesetClear(elements?: null | unknown[]): void;

  /**
   * Typeset math expressions in the given elements asynchronously.
   *
   * @param elements - The elements to typeset.
   * @returns A promise that resolves when typesetting is complete.
   */
  typesetPromise(elements?: null | unknown[]): Promise<void>;
}
