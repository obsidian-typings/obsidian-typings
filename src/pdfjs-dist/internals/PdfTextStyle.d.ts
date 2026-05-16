/**
 * Style information for a text item in a PDF page.
 *
 * @public
 * @unofficial
 */
export interface PdfTextStyle {
  /** Ascent of the font. */
  ascent: number;
  /** Descent of the font. */
  descent: number;
  /** Font family name. */
  fontFamily: string;
  /** Whether the text is vertical. */
  vertical: boolean;
}
