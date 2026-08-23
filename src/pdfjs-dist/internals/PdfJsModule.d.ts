import type { DocumentInitParameters } from './DocumentInitParameters.d.ts';
import type { GlobalWorkerOptionsType } from './GlobalWorkerOptionsType.d.ts';
import type { PDFDocumentLoadingTask } from './PDFDocumentLoadingTask.d.ts';
import type { PdfJsDateString } from './PdfJsDateString.d.ts';
import type { PdfJsPasswordResponses } from './PdfJsPasswordResponses.d.ts';
import type { PdfJsUtil } from './PdfJsUtil.d.ts';

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
  /** The reasons a document can ask for a password. */
  PasswordResponses: PdfJsPasswordResponses;
  /** Converter for the date strings a PDF document stores in its metadata. */
  PDFDateString: PdfJsDateString;
  /** Geometry helpers of the PDF.js library. */
  Util: PdfJsUtil;
  /** The version string of the PDF.js library. */
  version: string;

  /**
   * Loads a PDF document from the given source.
   *
   * @param src - The document source.
   * @returns The loading task for the document.
   */
  getDocument(src: ArrayBuffer | DocumentInitParameters | string | Uint8Array | URL): PDFDocumentLoadingTask;

  /**
   * Normalizes the Unicode of the given text so that it can be searched and copied as typed.
   *
   * @param text - The text to normalize.
   * @returns The normalized text.
   */
  normalizeUnicode(text: string): string;
}
