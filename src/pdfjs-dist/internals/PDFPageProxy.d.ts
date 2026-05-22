import type { GetAnnotationsParams } from './GetAnnotationsParams.d.ts';
import type { GetTextContentParams } from './GetTextContentParams.d.ts';
import type { GetViewportParams } from './GetViewportParams.d.ts';
import type { PageViewport } from './PageViewport.d.ts';
import type { RenderParameters } from './RenderParameters.d.ts';
import type { RenderTask } from './RenderTask.d.ts';
import type { TextContent } from './TextContent.d.ts';

/**
 * Proxy for a single PDF page.
 *
 * @public
 * @unofficial
 */
export interface PDFPageProxy {
  /** Page number (1-based). */
  pageNumber: number;
  /** Reference object for the page, if available. */
  ref: null | object;
  /** Page rotation angle in degrees. */
  rotate: number;
  /** User unit size. */
  userUnit: number;
  /** The page view box coordinates. */
  view: number[];

  /**
   * Cleans up resources held by the page.
   *
   * @param resetStats - Whether to reset statistics.
   * @returns Whether cleanup was performed.
   */
  cleanup(resetStats?: boolean): boolean;

  /**
   * Gets the annotations for the page.
   *
   * @param params - Optional parameters including `intent` (the rendering intent).
   * @returns A promise resolving to the annotations.
   */
  getAnnotations(params?: GetAnnotationsParams): Promise<unknown[]>;

  /**
   * Gets the operator list for the page.
   *
   * @returns A promise resolving to the operator list.
   */
  getOperatorList(): Promise<unknown>;

  /**
   * Gets the text content of the page.
   *
   * @param params - Optional parameters including `includeMarkedContent` and `disableNormalization`.
   * @returns A promise resolving to the text content.
   */
  getTextContent(params?: GetTextContentParams): Promise<TextContent>;

  /**
   * Gets the viewport for the page.
   *
   * @param params - Viewport parameters including `scale`, `rotation`, `offsetX`, `offsetY`, and `dontFlip`.
   * @returns The computed viewport.
   */
  getViewport(params: GetViewportParams): PageViewport;

  /** Height of the page. */
  get height(): number;

  /**
   * Renders the page to a canvas context.
   *
   * @param params - Render parameters.
   * @returns The render task.
   */
  render(params: RenderParameters): RenderTask;

  /**
   * Streams the text content of the page.
   *
   * @param params - Optional parameters including `includeMarkedContent` and `disableNormalization`.
   * @returns A readable stream of text content.
   */
  streamTextContent(params?: GetTextContentParams): ReadableStream;

  /** Width of the page. */
  get width(): number;
}
