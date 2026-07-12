import type { ElectronSize } from './ElectronSize.d.ts';

/**
 * Options for printing a web page to PDF.
 *
 * @public
 * @unofficial
 */
export interface ElectronPrintToPDFOptions {
  /** The header and footer for the PDF. */
  headerFooter?: Record<string, string>;

  /** `true` for landscape, `false` for portrait. */
  landscape?: boolean;

  /**
   * Specifies the type of margins to use. Uses `0` for default margin, `1` for no margin, and `2` for minimum margin.
   */
  marginsType?: number;

  /** The page range to print. On macOS, only the first range is honored. */
  pageRanges?: Record<string, number>;

  /**
   * The page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an object containing `height` and `width`.
   */
  pageSize?: ElectronSize | string;

  /** Whether to print CSS backgrounds. */
  printBackground?: boolean;

  /** Whether to print the selection only. */
  printSelectionOnly?: boolean;

  /** The scale factor of the web page. Can range from `0` to `100`. */
  scaleFactor?: number;
}
