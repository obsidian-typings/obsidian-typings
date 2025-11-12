import { loadPdfJs as loadPdfJsOriginal } from 'obsidian';
import type { default as pdfjsLib } from 'pdfjs-dist';

/**
 * Load PDF.js and return a promise to the global pdfjsLib object.
 * Can also use {@link Window.pdfjsLib} after this promise resolves to get the same reference.
 *
 * @returns A promise that resolves to the global {@link Window.pdfjsLib} object.
 *
 * @see {@link https://mozilla.github.io/pdf.js/ Official PDF.js documentation}.
 */
export async function loadPdfJs(): Promise<typeof pdfjsLib> {
    return (await loadPdfJsOriginal()) as typeof pdfjsLib;
}
