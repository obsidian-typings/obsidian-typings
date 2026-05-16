import type { ElectronFileFilter } from './ElectronFileFilter.d.ts';

/**
 * Options for Electron open file dialog.
 *
 * @public
 * @unofficial
 */
export interface ElectronOpenDialogOptions {
  /** The label for the confirmation button. */
  buttonLabel?: string;

  /** The default path to open the dialog at. */
  defaultPath?: string;

  /** The file filters to display. */
  filters?: ElectronFileFilter[];

  /** The message to display above the dialog on macOS. */
  message?: string;

  /** The dialog behavior properties. */
  properties?: Array<
    | 'createDirectory'
    | 'dontAddToRecent'
    | 'multiSelections'
    | 'noResolveAliases'
    | 'openDirectory'
    | 'openFile'
    | 'promptToCreate'
    | 'showHiddenFiles'
    | 'treatPackageAsDirectory'
  >;

  /** The dialog title. */
  title?: string;
}
