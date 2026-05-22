/**
 * Mark information for a PDF document.
 *
 * @public
 * @unofficial
 */
export interface PDFMarkInfo {
  /** Whether the document is marked. */
  Marked: boolean;
  /** Whether the document has suspects. */
  Suspects: boolean;
  /** Whether the document has user properties. */
  UserProperties: boolean;
}
