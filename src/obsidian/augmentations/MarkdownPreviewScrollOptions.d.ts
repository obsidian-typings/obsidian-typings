export {};

declare module 'obsidian' {
  /**
   * Options for {@link MarkdownPreviewRenderer.applyScroll}.
   */
  export interface MarkdownPreviewScrollOptions {
    /**
     * Whether to center the scroll target in the viewport.
     *
     * @unofficial
     */
    center?: boolean;

    /**
     * Whether to highlight the scroll target.
     *
     * @unofficial
     */
    highlight?: boolean;
  }
}
