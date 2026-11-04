import type { PDFDocumentLoadingTask } from '../internals/PDFDocumentLoadingTask.d.ts';
import type { PdfJsInterop } from './PdfJsInterop.d.ts';

/**
 * The selected PDFDocumentLoadingTask contract at Obsidian's PDF.js boundary.
 *
 * @public
 * @unofficial
 */
export type InteropPDFDocumentLoadingTask = PdfJsInterop<'PDFDocumentLoadingTask', PDFDocumentLoadingTask>;
