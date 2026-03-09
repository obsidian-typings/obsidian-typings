import type { HighlightOutline } from './HighlightOutline.d.ts';

/**
 * Generates outlines around highlighted regions in a PDF document.
 * @public
 * @unofficial
 */
export declare class HighlightOutliner {
  /**
   * Construct an outliner.
   *
   * @param boxes - An array of axis-aligned rectangles.
   * @param borderWidth - The width of the border of the boxes, it.
   *   allows to make the boxes bigger (or smaller).
   * @param innerMargin - The margin between the boxes and the.
   *   outlines. It's important to not have a `null` innerMargin when we want to.
   *   draw the outline else the stroked outline could be clipped because of its.
   *   width.
   * @param isLTR - `true` if we're in LTR mode. It's used to determine.
   *   the last point of the boxes.
   */
  constructor(boxes: Array<Object>, borderWidth?: number, innerMargin?: number, isLTR?: boolean);

  /**
   * Compute and return the highlight outlines for the given boxes.
   *
   * @returns The computed highlight outlines.
   */
  getOutlines(): HighlightOutline;
}
