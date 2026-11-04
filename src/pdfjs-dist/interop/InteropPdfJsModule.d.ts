import type { PdfJsModule } from '../internals/PdfJsModule.d.ts';
import type { PdfJsInterop } from './PdfJsInterop.d.ts';

/**
 * The selected PdfJsModule contract at Obsidian's PDF.js boundary.
 *
 * @public
 * @unofficial
 */
export type InteropPdfJsModule = PdfJsInterop<'PdfJsModule', PdfJsModule>;
