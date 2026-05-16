import type { PDFWorker } from './PDFWorker.d.ts';

/**
 * Parameters for initializing a PDF document.
 *
 * @public
 * @unofficial
 */
export interface DocumentInitParameters {
  /** Whether CMap files are packed. */
  cMapPacked?: boolean;
  /** URL for CMap files. */
  cMapUrl?: string;
  /** Document data as ArrayBuffer, string, or Uint8Array. */
  data?: ArrayBuffer | string | Uint8Array;
  /** Whether to disable automatic data fetching. */
  disableAutoFetch?: boolean;
  /** Whether to disable font face creation. */
  disableFontFace?: boolean;
  /** Whether to disable range requests. */
  disableRange?: boolean;
  /** Whether to disable streaming. */
  disableStream?: boolean;
  /** HTTP headers to include in requests. */
  httpHeaders?: Record<string, string>;
  /** Whether eval is supported in the environment. */
  isEvalSupported?: boolean;
  /** Whether OffscreenCanvas is supported. */
  isOffscreenCanvasSupported?: boolean;
  /** Password for encrypted documents. */
  password?: string;
  /** URL for standard font data files. */
  standardFontDataUrl?: string;
  /** Document URL. */
  url?: string;
  /** Whether to use system fonts. */
  useSystemFonts?: boolean;
  /** Verbosity level. */
  verbosity?: number;
  /** Whether to include credentials in requests. */
  withCredentials?: boolean;
  /** PDF.js worker instance. */
  worker?: PDFWorker;
}
