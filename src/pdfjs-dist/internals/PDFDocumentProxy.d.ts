import type { PDFPageProxy } from './PDFPageProxy.d.ts';

/**
 * Proxy for an opened PDF document.
 *
 * @public
 * @unofficial
 */
export interface PDFDocumentProxy {
  /** Document fingerprints. */
  fingerprints: [string, null | string];
  /** Whether the document is a pure XFA form. */
  isPureXfa: boolean;
  /** Loading parameters used for the document. */
  loadingParams: { disableAutoFetch: boolean; disableStream: boolean };
  /** Total number of pages. */
  numPages: number;

  /**
   * Cleans up resources held by the document.
   *
   * @param manuallyTriggered - Whether cleanup was manually triggered.
   * @returns A promise that resolves when cleanup is complete.
   */
  cleanup(manuallyTriggered?: boolean): Promise<void>;

  /**
   * Destroys the document and releases resources.
   *
   * @returns A promise that resolves when destruction is complete.
   */
  destroy(): Promise<void>;

  /**
   * Gets the attachments of the document.
   *
   * @returns A promise resolving to the attachments.
   */
  getAttachments(): Promise<null | Record<string, unknown>>;

  /**
   * Gets the raw document data.
   *
   * @returns A promise resolving to the document bytes.
   */
  getData(): Promise<Uint8Array>;

  /**
   * Gets a named destination.
   *
   * @param id - The destination identifier.
   * @returns A promise resolving to the destination, or `null` if not found.
   */
  getDestination(id: string): Promise<null | unknown[]>;

  /**
   * Gets all named destinations.
   *
   * @returns A promise resolving to all destinations.
   */
  getDestinations(): Promise<Record<string, unknown[]>>;

  /**
   * Gets download information for the document.
   *
   * @returns A promise resolving to download info.
   */
  getDownloadInfo(): Promise<{ length: number }>;

  /**
   * Gets the mark information for the document.
   *
   * @returns A promise resolving to the mark info, or `null` if not available.
   */
  getMarkInfo(): Promise<{ Marked: boolean; UserProperties: boolean; Suspects: boolean } | null>;

  /**
   * Gets the document metadata.
   *
   * @returns A promise resolving to the metadata.
   */
  getMetadata(): Promise<{ info: Record<string, unknown>; metadata: null | unknown; contentDispositionFilename: null | string; contentLength: null | number }>;

  /**
   * Gets the open action for the document.
   *
   * @returns A promise resolving to the open action, or `null` if not defined.
   */
  getOpenAction(): Promise<null | object>;

  /**
   * Gets a page by its 1-based page number.
   *
   * @param pageNumber - The 1-based page number.
   * @returns A promise resolving to the page proxy.
   */
  getPage(pageNumber: number): Promise<PDFPageProxy>;

  /**
   * Gets the page index for a reference object.
   *
   * @param ref - The reference object.
   * @returns A promise resolving to the page index.
   */
  getPageIndex(ref: object): Promise<number>;

  /**
   * Gets the page labels.
   *
   * @returns A promise resolving to the labels, or `null` if not defined.
   */
  getPageLabels(): Promise<null | string[]>;

  /**
   * Gets the page layout.
   *
   * @returns A promise resolving to the layout name.
   */
  getPageLayout(): Promise<string>;

  /**
   * Gets the page mode.
   *
   * @returns A promise resolving to the mode name.
   */
  getPageMode(): Promise<string>;

  /**
   * Gets the viewer preferences.
   *
   * @returns A promise resolving to viewer preferences, or `null` if not defined.
   */
  getViewerPreferences(): Promise<null | Record<string, unknown>>;

  /**
   * Saves the document.
   *
   * @returns A promise resolving to the saved document bytes.
   */
  saveDocument(): Promise<Uint8Array>;
}
