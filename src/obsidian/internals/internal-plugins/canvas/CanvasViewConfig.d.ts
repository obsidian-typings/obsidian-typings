import type { Dimensions } from '../../Dimensions.d.ts';

/**
 * Configuration options for the canvas view.
 *
 * @public
 * @unofficial
 */
export interface CanvasViewConfig {
  /** Default dimensions for newly created file nodes. */
  defaultFileNodeDimensions: Dimensions;

  /** Default dimensions for newly created text nodes. */
  defaultTextNodeDimensions: Dimensions;

  /** Minimum dimension (width or height) for container/group nodes. */
  minContainerDimension: number;

  /** Distance threshold in pixels for snapping objects to each other. */
  objectSnapDistance: number;

  /** Multiplier applied to zoom increments. */
  zoomMultiplier: number;
}
