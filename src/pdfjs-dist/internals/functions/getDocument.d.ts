import type { DocumentInitParameters } from '../DocumentInitParameters.d.ts';
import type { PDFDocumentLoadingTask } from '../PDFDocumentLoadingTask.d.ts';

/**
 * Loads a PDF document from the given source.
 *
 * @param src - The document source (URL, ArrayBuffer, DocumentInitParameters, string, or Uint8Array).
 * @returns The loading task for the document.
 * @public
 * @unofficial
 */
export declare function getDocument(src: ArrayBuffer | DocumentInitParameters | string | Uint8Array | URL): PDFDocumentLoadingTask;
