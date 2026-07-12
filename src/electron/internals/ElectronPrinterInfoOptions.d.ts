/**
 * An object containing a variable number of platform-specific printer information entries.
 *
 * @public
 * @unofficial
 */
export interface ElectronPrinterInfoOptions {
  /** Platform-specific printer information keyed by option name. */
  [key: string]: string;
}
