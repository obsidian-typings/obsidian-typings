import type { BrowserWindow } from './BrowserWindow.d.ts';
import type { ElectronMessageBoxOptions } from './ElectronMessageBoxOptions.d.ts';
import type { ElectronMessageBoxReturnValue } from './ElectronMessageBoxReturnValue.d.ts';
import type { ElectronOpenDialogOptions } from './ElectronOpenDialogOptions.d.ts';
import type { ElectronOpenDialogReturnValue } from './ElectronOpenDialogReturnValue.d.ts';
import type { ElectronSaveDialogOptions } from './ElectronSaveDialogOptions.d.ts';
import type { ElectronSaveDialogReturnValue } from './ElectronSaveDialogReturnValue.d.ts';

/**
 * Electron Dialog for showing native system dialogs.
 *
 * @public
 * @unofficial
 */
export interface Dialog {
  /**
   * Shows an error message box.
   *
   * @param title - The dialog title.
   * @param content - The error message content.
   */
  showErrorBox(title: string, content: string): void;

  /**
   * Shows a message box dialog.
   *
   * @param browserWindow - The parent window.
   * @param options - The message box options.
   * @returns The user's response.
   */
  showMessageBox(browserWindow: BrowserWindow, options: ElectronMessageBoxOptions): Promise<ElectronMessageBoxReturnValue>;

  /**
   * Shows a message box dialog.
   *
   * @param options - The message box options.
   * @returns The user's response.
   */
  showMessageBox(options: ElectronMessageBoxOptions): Promise<ElectronMessageBoxReturnValue>;

  /**
   * Shows an open file dialog.
   *
   * @param browserWindow - The parent window.
   * @param options - The open dialog options.
   * @returns The selected file paths.
   */
  showOpenDialog(browserWindow: BrowserWindow, options: ElectronOpenDialogOptions): Promise<ElectronOpenDialogReturnValue>;

  /**
   * Shows an open file dialog.
   *
   * @param options - The open dialog options.
   * @returns The selected file paths.
   */
  showOpenDialog(options: ElectronOpenDialogOptions): Promise<ElectronOpenDialogReturnValue>;

  /**
   * Shows a save file dialog.
   *
   * @param browserWindow - The parent window.
   * @param options - The save dialog options.
   * @returns The selected file path.
   */
  showSaveDialog(browserWindow: BrowserWindow, options: ElectronSaveDialogOptions): Promise<ElectronSaveDialogReturnValue>;

  /**
   * Shows a save file dialog.
   *
   * @param options - The save dialog options.
   * @returns The selected file path.
   */
  showSaveDialog(options: ElectronSaveDialogOptions): Promise<ElectronSaveDialogReturnValue>;
}
