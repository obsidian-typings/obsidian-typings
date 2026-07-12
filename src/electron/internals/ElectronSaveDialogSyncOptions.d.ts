import type { ElectronFileFilter } from './ElectronFileFilter.d.ts';

/**
 * Options for Electron synchronous save file dialog.
 *
 * @public
 * @unofficial
 */
export interface ElectronSaveDialogSyncOptions {
  /** The label for the confirmation button. */
  buttonLabel?: string;

  /** The default path to open the dialog at. */
  defaultPath?: string;

  /** The file filters to display. */
  filters?: ElectronFileFilter[];

  /** The message to display above the dialog on macOS. */
  message?: string;

  /** The label for the file name text field on macOS. */
  nameFieldLabel?: string;

  /** The dialog behavior properties. */
  properties?: Array<'createDirectory' | 'dontAddToRecent' | 'showHiddenFiles' | 'showOverwriteConfirmation' | 'treatPackageAsDirectory'>;

  /** Whether to create a security scoped bookmark when packaged for the Mac App Store (macOS, mas only). */
  securityScopedBookmarks?: boolean;

  /** Whether to show the tags field on macOS. */
  showsTagField?: boolean;

  /** The dialog title. */
  title?: string;
}
