import type { ElectronPrintToPDFOptions } from '../ElectronPrintToPDFOptions.d.ts';

/**
 * The options Obsidian's `print-to-pdf` IPC channel takes: Electron's own PDF options plus where to write the file.
 *
 * @public
 * @unofficial
 */
export interface ObsidianIpcPrintToPdfOptions extends ElectronPrintToPDFOptions {
  /** The path of the PDF file to write. */
  filepath: string;

  /** Whether to open the written file with the system's default application. */
  open?: boolean;
}
