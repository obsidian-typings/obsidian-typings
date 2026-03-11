import type { default as pdfjsLibInstance } from 'pdfjs-dist';

export {};

declare global {
  /**
   * PDF.js library for parsing and rendering PDF documents.
   * @unofficial
   */
  const pdfjsLib: typeof pdfjsLibInstance;
}
