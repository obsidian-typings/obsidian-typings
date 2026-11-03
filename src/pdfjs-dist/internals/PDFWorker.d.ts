import type { PDFWorkerFromPortParams } from './PDFWorkerFromPortParams.d.ts';
import type { PDFWorkerParams } from './PDFWorkerParams.d.ts';

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
  constructor(params?: PDFWorkerParams);

  /**
   * Reuses the worker registered for the supplied port, or creates a new worker.
   *
   * @param params - Worker parameters.
   * @returns The existing or newly created PDFWorker instance.
   */
  static create(params?: PDFWorkerParams): PDFWorker;

  /** Destroys the worker. */
  destroy(): void;

  /**
   * Creates a PDFWorker from an existing port.
   *
   * @param params - Parameters including the port.
   * @returns The existing or newly created PDFWorker instance.
   * @deprecated Use {@link PDFWorker.create} instead.
   */
  static fromPort(params: PDFWorkerFromPortParams): PDFWorker;

  /** The worker source URL. Throws if no worker source is configured. */
  static get workerSrc(): string;
}
