import type { PdfJsTestingUtils } from '../../../obsidian/internals/pdf-js/PdfJsTestingUtils.d.ts';

export {};

declare global {
  /**
   * Testing utilities for PDF.js.
   * @unofficial
   */
  const pdfjsTestingUtils: PdfJsTestingUtils;
}
