import type { PdfJsTestingUtils } from '../../../pdfjs-dist/internals/PdfJsTestingUtils.d.ts';

export {};

declare global {
  /**
   * Testing utilities for PDF.js.
   *
   * @unofficial
   */
  var pdfjsTestingUtils: PdfJsTestingUtils;
}
