/**
 * PDF.js Web Worker wrapper.
 *
 * @public
 * @unofficial
 */
export declare class PDFWorker {
  /** The message handler for worker communication. */
  readonly messageHandler: null | unknown;

  /** The worker port. */
  readonly port: null | unknown;

  /** Promise that resolves when the worker is ready. */
  readonly promise: Promise<void>;

  /** Creates a new PDFWorker instance. */
  constructor(params?: { name?: string; port?: unknown; verbosity?: number });

  /** Destroys the worker. */
  destroy(): void;

  /**
   * Creates a PDFWorker from an existing port.
   *
   * @param params - Parameters including the port.
   * @returns A new PDFWorker instance.
   */
  static fromPort(params: { port: unknown; verbosity?: number }): PDFWorker;

  /**
   * Gets the URL of the worker source.
   *
   * @returns The worker source URL.
   */
  static getWorkerSrc(): string;
}
