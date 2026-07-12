import type { ElectronMargins } from './ElectronMargins.d.ts';
import type { ElectronPageRanges } from './ElectronPageRanges.d.ts';
import type { ElectronSize } from './ElectronSize.d.ts';

/**
 * Options for printing a webview page.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebviewTagPrintOptions {
  /** Whether the web page should be collated. */
  collate?: boolean;

  /**
   * Whether the printed web page will be in color or grayscale.
   *
   * @default `true`
   */
  color?: boolean;

  /** The number of copies of the web page to print. */
  copies?: number;

  /**
   * The name of the printer device to use. Must be the system-defined name and not the 'friendly' name, e.g. `Brother_QL_820NWB` and not `Brother QL-820NWB`.
   */
  deviceName?: string;

  /** The DPI settings of the printed web page, keyed by axis. */
  dpi?: Record<string, number>;

  /** The duplex mode of the printed web page. */
  duplexMode?: 'longEdge' | 'shortEdge' | 'simplex';

  /** The string to be printed as the page footer. */
  footer?: string;

  /** The string to be printed as the page header. */
  header?: string;

  /**
   * Whether the web page should be printed in landscape mode.
   *
   * @default `false`
   */
  landscape?: boolean;

  /** The margins of the printed web page. */
  margins?: ElectronMargins;

  /** The page range to print. */
  pageRanges?: ElectronPageRanges[];

  /**
   * The page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an object containing `height` and `width`.
   */
  pageSize?: ElectronSize | string;

  /** The number of pages to print per page sheet. */
  pagesPerSheet?: number;

  /**
   * Whether to print the background color and image of the web page.
   *
   * @default `false`
   */
  printBackground?: boolean;

  /** The scale factor of the web page. */
  scaleFactor?: number;

  /**
   * Whether to print silently without asking the user for print settings.
   *
   * @default `false`
   */
  silent?: boolean;
}
