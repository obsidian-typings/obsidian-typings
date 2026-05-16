/**
 * Return value from an Electron save file dialog.
 *
 * @public
 * @unofficial
 */
export interface ElectronSaveDialogReturnValue {
  /** Whether the dialog was canceled. */
  canceled: boolean;

  /** The file path chosen by the user. */
  filePath?: string;
}
