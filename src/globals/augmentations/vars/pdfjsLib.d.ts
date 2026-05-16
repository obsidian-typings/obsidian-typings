import type { PdfJsModule } from '../../../pdfjs-dist/internals/PdfJsModule.d.ts';

export {};

declare global {
  /**
   * PDF.js library for parsing and rendering PDF documents.
   *
   * @unofficial
   */
  var pdfjsLib: PdfJsModule;
}
