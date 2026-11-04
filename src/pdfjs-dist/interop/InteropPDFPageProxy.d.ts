import type { PDFPageProxy } from '../internals/PDFPageProxy.d.ts';
import type { PdfJsInterop } from './PdfJsInterop.d.ts';

/**
 * The selected PDFPageProxy contract at Obsidian's PDF.js boundary.
 *
 * @public
 * @unofficial
 */
export type InteropPDFPageProxy = PdfJsInterop<'PDFPageProxy', PDFPageProxy>;
