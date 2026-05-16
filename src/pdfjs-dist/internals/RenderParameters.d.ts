import type { PageViewport } from './PageViewport.d.ts';

/**
 * Parameters for rendering a PDF page.
 *
 * @public
 * @unofficial
 */
export interface RenderParameters {
  /** Background color for the canvas. */
  background?: string;
  /** The 2D canvas rendering context to draw on. */
  canvasContext: CanvasRenderingContext2D;
  /** Rendering intent. */
  intent?: string;
  /** Additional transform matrix. */
  transform?: number[];
  /** The viewport to use for rendering. */
  viewport: PageViewport;
}
