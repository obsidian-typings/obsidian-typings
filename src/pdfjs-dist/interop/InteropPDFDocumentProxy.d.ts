import type { PDFDocumentProxy } from '../internals/PDFDocumentProxy.d.ts';
import type { PdfJsInterop } from './PdfJsInterop.d.ts';

/**
 * The selected PDFDocumentProxy contract at Obsidian's PDF.js boundary.
 *
 * @public
 * @unofficial
 */
export type InteropPDFDocumentProxy = PdfJsInterop<'PDFDocumentProxy', PDFDocumentProxy>;
