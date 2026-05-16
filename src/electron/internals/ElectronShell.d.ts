/**
 * Electron Shell for managing files and URLs using their default applications.
 *
 * @public
 * @unofficial
 */
export interface ElectronShell {
  /** Plays the system beep sound. */
  beep(): void;

  /* eslint-disable jsdoc/check-param-names -- TSDoc does not support dot-notation sub-params. */
  /**
   * Opens the given external protocol URL in the desktop's default manner.
   *
   * @param url - The URL to open.
   * @param options - Options for opening the URL including `activate` and `workingDirectory`.
   */
  openExternal(url: string, options?: { activate?: boolean; workingDirectory?: string }): Promise<void>;
  /* eslint-enable jsdoc/check-param-names -- Re-enable after inline object param. */

  /**
   * Opens the given file in the desktop's default manner.
   *
   * @param path - The path to open.
   * @returns An error message if the path could not be opened.
   */
  openPath(path: string): Promise<string>;

  /**
   * Shows the given file in a file manager, with the file pre-selected.
   *
   * @param fullPath - The full path to the file.
   */
  showItemInFolder(fullPath: string): void;

  /**
   * Moves the given file to trash.
   *
   * @param path - The path to the file.
   */
  trashItem(path: string): Promise<void>;
}
