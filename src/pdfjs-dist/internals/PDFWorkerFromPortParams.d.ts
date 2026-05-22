/**
 * Parameters for creating a PDFWorker from an existing port.
 *
 * @public
 * @unofficial
 */
export interface PDFWorkerFromPortParams {
  /** The worker port. */
  port: unknown;
  /** Verbosity level. */
  verbosity?: number;
}
