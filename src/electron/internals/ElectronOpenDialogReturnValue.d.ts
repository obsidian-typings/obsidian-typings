/**
 * Return value from an Electron open file dialog.
 *
 * @public
 * @unofficial
 */
export interface ElectronOpenDialogReturnValue {
  /** An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data (macOS, mas only). */
  bookmarks?: string[];

  /** Whether the dialog was canceled. */
  canceled: boolean;

  /** The file paths chosen by the user. */
  filePaths: string[];
}
