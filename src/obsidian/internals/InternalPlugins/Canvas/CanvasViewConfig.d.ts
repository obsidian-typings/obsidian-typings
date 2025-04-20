import type { Dimensions } from './Dimensions.d.ts';

/**
 * @public
 * @unofficial
 */
export interface CanvasViewConfig {
    defaultFileNodeDimensions: Dimensions;
    defaultTextNodeDimensions: Dimensions;
    minContainerDimension: number;
    objectSnapDistance: number;
    zoomMultiplier: number;
}
