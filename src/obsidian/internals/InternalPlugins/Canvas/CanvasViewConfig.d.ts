import type { Dimensions } from './Dimensions.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface CanvasViewConfig {
    /** @todo Documentation incomplete. */
    defaultFileNodeDimensions: Dimensions;

    /** @todo Documentation incomplete. */
    defaultTextNodeDimensions: Dimensions;

    /** @todo Documentation incomplete. */
    minContainerDimension: number;

    /** @todo Documentation incomplete. */
    objectSnapDistance: number;

    /** @todo Documentation incomplete. */
    zoomMultiplier: number;
}
