import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronCertificateTrustDialogOptions } from './ElectronCertificateTrustDialogOptions.d.ts';
import type { ElectronMessageBoxOptions } from './ElectronMessageBoxOptions.d.ts';
import type { ElectronMessageBoxReturnValue } from './ElectronMessageBoxReturnValue.d.ts';
import type { ElectronMessageBoxSyncOptions } from './ElectronMessageBoxSyncOptions.d.ts';
import type { ElectronOpenDialogOptions } from './ElectronOpenDialogOptions.d.ts';
import type { ElectronOpenDialogReturnValue } from './ElectronOpenDialogReturnValue.d.ts';
import type { ElectronOpenDialogSyncOptions } from './ElectronOpenDialogSyncOptions.d.ts';
import type { ElectronSaveDialogOptions } from './ElectronSaveDialogOptions.d.ts';
import type { ElectronSaveDialogReturnValue } from './ElectronSaveDialogReturnValue.d.ts';
import type { ElectronSaveDialogSyncOptions } from './ElectronSaveDialogSyncOptions.d.ts';

/**
 * Electron Dialog for showing native system dialogs.
 *
 * @public
 * @unofficial
 */
export interface ElectronDialog {
  /**
   * Shows a certificate trust dialog (macOS, Windows only).
   *
   * @param browserWindow - The parent window the dialog attaches to.
   * @param options - The certificate trust dialog options.
   * @returns A `Promise` that resolves when the certificate trust dialog is shown.
   */
  showCertificateTrustDialog(browserWindow: ElectronBrowserWindow, options: ElectronCertificateTrustDialogOptions): Promise<void>;

  /**
   * Shows a certificate trust dialog (macOS, Windows only).
   *
   * @param options - The certificate trust dialog options.
   * @returns A `Promise` that resolves when the certificate trust dialog is shown.
   */
  showCertificateTrustDialog(options: ElectronCertificateTrustDialogOptions): Promise<void>;

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
  showMessageBox(browserWindow: ElectronBrowserWindow, options: ElectronMessageBoxOptions): Promise<ElectronMessageBoxReturnValue>;

  /**
   * Shows a message box dialog.
   *
   * @param options - The message box options.
   * @returns The user's response.
   */
  showMessageBox(options: ElectronMessageBoxOptions): Promise<ElectronMessageBoxReturnValue>;

  /**
   * Shows a message box dialog, blocking the process until it is closed.
   *
   * @param browserWindow - The parent window.
   * @param options - The message box options.
   * @returns The index of the clicked button.
   */
  showMessageBoxSync(browserWindow: ElectronBrowserWindow, options: ElectronMessageBoxSyncOptions): number;

  /**
   * Shows a message box dialog, blocking the process until it is closed.
   *
   * @param options - The message box options.
   * @returns The index of the clicked button.
   */
  showMessageBoxSync(options: ElectronMessageBoxSyncOptions): number;

  /**
   * Shows an open file dialog.
   *
   * @param browserWindow - The parent window.
   * @param options - The open dialog options.
   * @returns The selected file paths.
   */
  showOpenDialog(browserWindow: ElectronBrowserWindow, options: ElectronOpenDialogOptions): Promise<ElectronOpenDialogReturnValue>;

  /**
   * Shows an open file dialog.
   *
   * @param options - The open dialog options.
   * @returns The selected file paths.
   */
  showOpenDialog(options: ElectronOpenDialogOptions): Promise<ElectronOpenDialogReturnValue>;

  /**
   * Shows an open file dialog, blocking the process until it is closed.
   *
   * @param browserWindow - The parent window.
   * @param options - The open dialog options.
   * @returns The file paths chosen by the user, or `undefined` if the dialog is cancelled.
   */
  showOpenDialogSync(browserWindow: ElectronBrowserWindow, options: ElectronOpenDialogSyncOptions): string[] | undefined;

  /**
   * Shows an open file dialog, blocking the process until it is closed.
   *
   * @param options - The open dialog options.
   * @returns The file paths chosen by the user, or `undefined` if the dialog is cancelled.
   */
  showOpenDialogSync(options: ElectronOpenDialogSyncOptions): string[] | undefined;

  /**
   * Shows a save file dialog.
   *
   * @param browserWindow - The parent window.
   * @param options - The save dialog options.
   * @returns The selected file path.
   */
  showSaveDialog(browserWindow: ElectronBrowserWindow, options: ElectronSaveDialogOptions): Promise<ElectronSaveDialogReturnValue>;

  /**
   * Shows a save file dialog.
   *
   * @param options - The save dialog options.
   * @returns The selected file path.
   */
  showSaveDialog(options: ElectronSaveDialogOptions): Promise<ElectronSaveDialogReturnValue>;

  /**
   * Shows a save file dialog, blocking the process until it is closed.
   *
   * @param browserWindow - The parent window.
   * @param options - The save dialog options.
   * @returns The path of the file chosen by the user, or `undefined` if the dialog is cancelled.
   */
  showSaveDialogSync(browserWindow: ElectronBrowserWindow, options: ElectronSaveDialogSyncOptions): string | undefined;

  /**
   * Shows a save file dialog, blocking the process until it is closed.
   *
   * @param options - The save dialog options.
   * @returns The path of the file chosen by the user, or `undefined` if the dialog is cancelled.
   */
  showSaveDialogSync(options: ElectronSaveDialogSyncOptions): string | undefined;
}
