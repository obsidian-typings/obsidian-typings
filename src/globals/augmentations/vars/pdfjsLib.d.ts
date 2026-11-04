import type { InteropPdfJsModule as PdfJsModule } from '../../../pdfjs-dist/interop/InteropPdfJsModule.d.ts';

export {};

declare global {
  /**
   * PDF.js library for parsing and rendering PDF documents.
   *
   * @unofficial
   */
  var pdfjsLib: PdfJsModule;
}
