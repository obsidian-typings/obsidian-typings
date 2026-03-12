export {};

declare global {
  /**
   * PDF.js library for parsing and rendering PDF documents.
   * @unofficial
   */
  const pdfjsLib: typeof import('pdfjs-dist');
}
