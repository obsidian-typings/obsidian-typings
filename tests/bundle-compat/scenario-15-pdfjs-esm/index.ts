import type {
  HighlightOutline,
  InteropPDFDocumentLoadingTask,
  InteropPDFDocumentProxy,
  InteropPDFPageProxy,
  InteropPDFWorker,
  InteropRenderTask,
  PdfJsTestingUtils
} from 'obsidian-typings';
import type { loadPdfJs } from 'obsidian-typings/implementations';
import type {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  PDFPageProxy,
  PDFWorker,
  RenderTask
} from 'pdfjs-dist';
import type {} from 'obsidian-typings/pdfjs';

declare const pdf: Awaited<ReturnType<typeof loadPdfJs>>;
declare const upstreamWorker: PDFWorker;
declare const upstreamLoadingTask: PDFDocumentLoadingTask;
declare const upstreamDocument: PDFDocumentProxy;
declare const upstreamPage: PDFPageProxy;
declare const upstreamRenderTask: RenderTask;
declare const canvasContext: CanvasRenderingContext2D;
declare const localWorker: InteropPDFWorker;
declare const localLoadingTask: InteropPDFDocumentLoadingTask;
declare const localDocument: InteropPDFDocumentProxy;
declare const localPage: InteropPDFPageProxy;
declare const localRenderTask: InteropRenderTask;

const worker: PDFWorker = localWorker;
const workerBack: InteropPDFWorker = upstreamWorker;
const loadingTask: PDFDocumentLoadingTask = localLoadingTask;
const loadingTaskBack: InteropPDFDocumentLoadingTask = upstreamLoadingTask;
const document: PDFDocumentProxy = localDocument;
const documentBack: InteropPDFDocumentProxy = upstreamDocument;
const page: PDFPageProxy = localPage;
const pageBack: InteropPDFPageProxy = upstreamPage;
const renderTask: RenderTask = localRenderTask;
const renderTaskBack: InteropRenderTask = upstreamRenderTask;
const loaded: PDFDocumentLoadingTask = pdf.getDocument({ data: new Uint8Array(), worker: upstreamWorker });
const documentPromise: Promise<PDFDocumentProxy> = loaded.promise;
const pagePromise: Promise<PDFPageProxy> = localDocument.getPage(1);
const task: RenderTask = localPage.render({ canvasContext: canvasContext, viewport: localPage.getViewport({ scale: 1 }) });
const createdWorker: PDFWorker = new pdf.PDFWorker();
const windowTask: PDFDocumentLoadingTask | undefined = window.pdfjsLib?.getDocument('sample.pdf');
const globalTask: PDFDocumentLoadingTask = pdfjsLib.getDocument('sample.pdf');
localRenderTask.onContinue = (resume: () => void) => resume();
const testing: PdfJsTestingUtils = window.pdfjsTestingUtils;
declare const outline: HighlightOutline;
void outline;
void [worker, workerBack, loadingTask, loadingTaskBack, document, documentBack, page, pageBack, renderTask, renderTaskBack, loaded, documentPromise, pagePromise, task, createdWorker, windowTask, globalTask, testing];

type IsAny<T> = 0 extends (1 & T) ? true : false;
const moduleHasType: IsAny<typeof pdf> = false;
const workerHasType: IsAny<InteropPDFWorker> = false;
const documentHasType: IsAny<Awaited<typeof documentPromise>> = false;
const pageHasType: IsAny<Awaited<typeof pagePromise>> = false;
const taskHasType: IsAny<typeof task> = false;
void [moduleHasType, workerHasType, documentHasType, pageHasType, taskHasType];
