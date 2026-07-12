/**
 * Return value from an Electron save file dialog.
 *
 * @public
 * @unofficial
 */
export interface ElectronSaveDialogReturnValue {
  /** Base64 encoded string which contains the security scoped bookmark data for the saved file (macOS, mas only). */
  bookmark?: string;

  /** Whether the dialog was canceled. */
  canceled: boolean;

  /** The file path chosen by the user. */
  filePath?: string;
}
