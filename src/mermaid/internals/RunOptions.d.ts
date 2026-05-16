/**
 * Options for running Mermaid rendering on existing DOM elements.
 *
 * @public
 * @unofficial
 */
export interface RunOptions {
  /** DOM nodes to render. */
  nodes?: ArrayLike<HTMLElement>;

  /** CSS selector for elements to render. */
  querySelector?: string;

  /** Whether to suppress rendering errors. */
  suppressErrors?: boolean;

  /**
   * Callback invoked after each diagram is rendered.
   *
   * @param id - The ID of the rendered diagram.
   * @returns The callback result.
   */
  postRenderCallback?(id: string): unknown;
}
