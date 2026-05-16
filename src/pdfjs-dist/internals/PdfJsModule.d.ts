import type { DocumentInitParameters } from './DocumentInitParameters.d.ts';
import type { GlobalWorkerOptionsType } from './GlobalWorkerOptionsType.d.ts';
import type { PDFDocumentLoadingTask } from './PDFDocumentLoadingTask.d.ts';

/**
 * The PDF.js library module type, representing the `window.pdfjsLib` object.
 *
 * @public
 * @unofficial
 */
export interface PdfJsModule {
  /** The build identifier of the PDF.js library. */
  build: string;
  /** Global worker options for PDF.js. */
  GlobalWorkerOptions: GlobalWorkerOptionsType;
  /** The version string of the PDF.js library. */
  version: string;

  /**
   * Loads a PDF document from the given source.
   *
   * @param src - The document source.
   * @returns The loading task for the document.
   */
  getDocument(src: ArrayBuffer | DocumentInitParameters | string | Uint8Array | URL): PDFDocumentLoadingTask;
}
