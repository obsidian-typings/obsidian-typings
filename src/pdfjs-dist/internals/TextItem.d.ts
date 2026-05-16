/**
 * A single text item extracted from a PDF page.
 *
 * @public
 * @unofficial
 */
export interface TextItem {
  /** Text direction. */
  dir: string;
  /** Font name reference. */
  fontName: string;
  /** Whether this item has an end-of-line marker. */
  hasEOL: boolean;
  /** Height of the text item. */
  height: number;
  /** The text string. */
  str: string;
  /** Transformation matrix for the text item. */
  transform: number[];
  /** Width of the text item. */
  width: number;
}
