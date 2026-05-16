/**
 * Result of rendering a Mermaid diagram.
 *
 * @public
 * @unofficial
 */
export interface RenderResult {
  /** The rendered SVG string. */
  svg: string;

  /**
   * Bind interactive functions to the rendered element.
   *
   * @param element - The rendered SVG element.
   */
  bindFunctions?(element: Element): void;
}
