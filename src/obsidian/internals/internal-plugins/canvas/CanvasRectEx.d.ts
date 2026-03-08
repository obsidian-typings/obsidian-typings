/**
 * Extended rectangle representation for the canvas, providing both min/max and position/size properties.
 * @public
 * @unofficial
 */
export interface CanvasRectEx {
    /** Center X coordinate of the rectangle. */
    cx: number;

    /** Center Y coordinate of the rectangle. */
    cy: number;

    /** Height of the rectangle. */
    height: number;

    /** Left edge X coordinate of the rectangle. */
    left: number;

    /** Maximum X coordinate (right edge). */
    maxX: number;

    /** Maximum Y coordinate (bottom edge). */
    maxY: number;

    /** Minimum X coordinate (left edge). */
    minX: number;

    /** Minimum Y coordinate (top edge). */
    minY: number;

    /** Top edge Y coordinate of the rectangle. */
    top: number;

    /** Width of the rectangle. */
    width: number;
}
