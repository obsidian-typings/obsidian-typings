import type { OnProgressParameters } from './OnProgressParameters.d.ts';
import type { PDFDocumentProxy } from './PDFDocumentProxy.d.ts';

/**
 * A task representing an ongoing PDF document loading operation.
 *
 * @public
 * @unofficial
 */
export interface PDFDocumentLoadingTask {
  /** Promise that resolves when the document is loaded. */
  promise: Promise<PDFDocumentProxy>;

  /** Destroys the loading task. */
  destroy(): void;

  /** Callback for password-protected documents. */
  onPassword?(updateCallback: (password: string) => void, reason: number): void;

  /** Callback for loading progress updates. */
  onProgress?(progressData: OnProgressParameters): void;
}
