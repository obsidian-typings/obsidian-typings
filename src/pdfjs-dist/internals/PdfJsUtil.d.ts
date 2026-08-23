/**
 * Geometry helpers of the PDF.js library.
 *
 * @remark Only the helpers Obsidian itself uses are described here.
 *
 * @public
 * @unofficial
 */
export interface PdfJsUtil {
  /**
   * Reorders the corners of a rectangle so that the first corner is the lower left one.
   *
   * @param rect - The rectangle as `[x1, y1, x2, y2]`.
   * @returns The normalized rectangle as `[x1, y1, x2, y2]`.
   */
  normalizeRect(rect: number[]): number[];
}
