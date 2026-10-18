import type { RendererSection } from './RendererSection.d.ts';

/**
 * Renderer for the reading/preview view, managing section-based markdown rendering.
 *
 * @public
 * @unofficial
 */
export interface ReadViewRenderer {
  /**
   * Whether to add bottom padding to the preview.
   */
  addBottomPadding: boolean;

  /**
   * Sections that are being rendered asynchronously.
   */
  asyncSections: unknown[];

  /**
   * The `.mod-footer.mod-ui` section rendered after the content, or `null` when the renderer has none.
   */
  footer: null | RendererSection;

  /**
   * The `.mod-header.mod-ui` section rendered before the content, or `null` when the renderer has none.
   */
  header: null | RendererSection;

  /**
   * Timestamp of the last render operation.
   */
  lastRender: number;

  /**
   * Last recorded scroll position.
   */
  lastScroll: number;

  /**
   * Text content from the last render, or `null` when the next render must not reuse it.
   */
  lastText: null | string;

  /**
   * Container element for the rendered preview.
   */
  previewEl: HTMLElement;

  /**
   * Element used to push content for scroll height calculation.
   */
  pusherEl: HTMLElement;

  /**
   * Pool of recycled section elements for reuse.
   */
  recycledSections: unknown[];

  /**
   * Callbacks waiting for the pending render to complete, or `null` when no render is pending.
   */
  rendered: (() => void)[] | null;

  /**
   * All sections in the rendered document.
   */
  sections: RendererSection[];

  /**
   * The `.markdown-preview-sizer` element that holds the rendered sections.
   */
  sizerEl: HTMLElement;

  /**
   * Current text content being rendered.
   */
  text: string;

  /**
   * Add the footer section, if the renderer has none yet.
   */
  addFooter(): void;

  /**
   * Add the header section, if the renderer has none yet.
   */
  addHeader(): void;

  /**
   * Clear all rendered sections and reset the renderer.
   */
  clear(): void;

  /**
   * Run a callback after the pending render completes, or immediately when no render is pending.
   *
   * @param callback - The callback to run.
   */
  onRendered(callback: () => void): void;

  /**
   * Parse the text content asynchronously into sections.
   */
  parseAsync(): void;

  /**
   * Parse the text content synchronously into sections.
   */
  parseSync(): void;

  /**
   * Queue a render update for the next animation frame.
   */
  queueRender(): void;

  /**
   * Remove the footer section, if the renderer has one.
   */
  removeFooter(): void;

  /**
   * Remove the header section, if the renderer has one.
   */
  removeHeader(): void;

  /**
   * Render the text again.
   *
   * @param full - Whether to also discard the rendered content of every section except the header and footer.
   */
  rerender(full?: boolean): void;

  /**
   * Set the text content and trigger a re-render.
   *
   * @param text - The text content to render.
   */
  set(text: string): void;

  /**
   * Re-measure the footer section and queue a render. Call it after changing the footer's content.
   */
  updateFooter(): void;

  /**
   * Re-measure the header section and queue a render. Call it after changing the header's content.
   */
  updateHeader(): void;
}
