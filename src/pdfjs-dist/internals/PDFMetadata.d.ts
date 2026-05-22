/**
 * Metadata for a PDF document.
 *
 * @public
 * @unofficial
 */
export interface PDFMetadata {
  /** The content disposition filename, if available. */
  contentDispositionFilename: null | string;
  /** The content length, if available. */
  contentLength: null | number;
  /** Document information dictionary. */
  info: Record<string, unknown>;
  /** The document metadata, if available. */
  metadata: null | unknown;
}
