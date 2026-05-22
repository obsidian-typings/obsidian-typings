/**
 * Options for printing a webview page.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebviewTagPrintOptions {
  /** The name of the printer device. */
  deviceName?: string;

  /** Whether to print the background. */
  printBackground?: boolean;

  /** Whether to print silently. */
  silent?: boolean;
}
