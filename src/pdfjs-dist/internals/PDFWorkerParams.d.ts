/**
 * Parameters for creating a PDFWorker instance.
 *
 * @public
 * @unofficial
 */
export interface PDFWorkerParams {
  /** Worker name. */
  name?: string;
  /** The worker port. */
  port?: unknown;
  /** Verbosity level. */
  verbosity?: number;
}
