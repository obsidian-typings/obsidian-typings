/**
 * Return value from an Electron open file dialog.
 *
 * @public
 * @unofficial
 */
export interface ElectronOpenDialogReturnValue {
  /** Whether the dialog was canceled. */
  canceled: boolean;

  /** The file paths chosen by the user. */
  filePaths: string[];
}
