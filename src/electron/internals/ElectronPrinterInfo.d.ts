import type { ElectronPrinterInfoOptions } from './ElectronPrinterInfoOptions.d.ts';

/**
 * Information about a system printer.
 *
 * @public
 * @unofficial
 */
export interface ElectronPrinterInfo {
  /** A longer description of the printer's type. */
  description: string;

  /** The name of the printer as shown in Print Preview. */
  displayName: string;

  /** Whether the printer is set as the default printer on the OS. */
  isDefault: boolean;

  /** The name of the printer as understood by the OS. */
  name: string;

  /** An object containing a variable number of platform-specific printer information. */
  options: ElectronPrinterInfoOptions;

  /** The current status of the printer. */
  status: number;
}
