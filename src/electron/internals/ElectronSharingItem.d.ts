/**
 * Electron SharingItem describing the content to share via the `shareMenu` role.
 *
 * @public
 * @unofficial
 */
export interface ElectronSharingItem {
  /** An array of files to share. */
  filePaths?: string[];

  /** An array of text to share. */
  texts?: string[];

  /** An array of URLs to share. */
  urls?: string[];
}
