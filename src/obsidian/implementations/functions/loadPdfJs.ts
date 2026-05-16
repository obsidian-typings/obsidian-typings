import { loadPdfJs as loadPdfJsOriginal } from 'obsidian';

import type { PdfJsModule } from '../../../pdfjs-dist/internals/PdfJsModule.d.ts';

/**
 * Load PDF.js and return a promise to the global pdfjsLib object.
 * Can also use `window.pdfjsLib` after this promise resolves to get the same reference.
 *
 * @returns A promise that resolves to the global `window.pdfjsLib` object.
 *
 * @see {@link https://mozilla.github.io/pdf.js/ | Official PDF.js documentation}.
 * @public
 * @unofficial
 */
export async function loadPdfJs(): Promise<PdfJsModule> {
  return (await loadPdfJsOriginal()) as PdfJsModule;
}
