import type { ElectronMargins } from './ElectronMargins.d.ts';
import type { ElectronPageRanges } from './ElectronPageRanges.d.ts';
import type { ElectronSize } from './ElectronSize.d.ts';

/**
 * Options for printing a web page.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebContentsPrintOptions {
  /**
   * Whether the web page should be collated.
   */
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
   * Set the printer device name to use. Must be the system-defined name and not the 'friendly' name.
   */
  deviceName?: string;

  /** The DPI of the printed web page keyed by axis. */
  dpi?: Record<string, number>;

  /** Set the duplex mode of the printed web page. */
  duplexMode?: 'longEdge' | 'shortEdge' | 'simplex';

  /** String to be printed as page footer. */
  footer?: string;

  /** String to be printed as page header. */
  header?: string;

  /**
   * Whether the web page should be printed in landscape mode.
   *
   * @default `false`
   */
  landscape?: boolean;

  /** The margins of the printed web page. */
  margins?: ElectronMargins;

  /** The page range to print. On macOS, only one range is honored. */
  pageRanges?: ElectronPageRanges[];

  /**
   * The page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an object containing `height` and `width`.
   */
  pageSize?: ElectronSize | string;

  /** The number of pages to print per page sheet. */
  pagesPerSheet?: number;

  /**
   * Prints the background color and image of the web page.
   *
   * @default `false`
   */
  printBackground?: boolean;

  /** The scale factor of the web page. */
  scaleFactor?: number;

  /**
   * Don't ask the user for print settings.
   *
   * @default `false`
   */
  silent?: boolean;
}
