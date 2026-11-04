import type { PDFWorker } from '../internals/PDFWorker.d.ts';
import type { PdfJsInterop } from './PdfJsInterop.d.ts';

/**
 * The selected PDFWorker contract at Obsidian's PDF.js boundary.
 *
 * @public
 * @unofficial
 */
export type InteropPDFWorker = PdfJsInterop<'PDFWorker', PDFWorker>;
