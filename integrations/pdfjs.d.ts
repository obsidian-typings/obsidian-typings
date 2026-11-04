import type {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  PDFPageProxy,
  PDFWorker,
  RenderTask
} from 'pdfjs-dist';

export {};

declare global {
  /** Installed PDF.js types selected by the explicit integration import. */
  interface ObsidianPdfJsTypes {
    /** Installed document loading task. */
    PDFDocumentLoadingTask: PDFDocumentLoadingTask;
    /** Installed document proxy. */
    PDFDocumentProxy: PDFDocumentProxy;
    /** Installed public module exports. */
    PdfJsModule: typeof import('pdfjs-dist');
    /** Installed page proxy. */
    PDFPageProxy: PDFPageProxy;
    /** Installed worker. */
    PDFWorker: PDFWorker;
    /** Installed rendering task. */
    RenderTask: RenderTask;
  }
}
