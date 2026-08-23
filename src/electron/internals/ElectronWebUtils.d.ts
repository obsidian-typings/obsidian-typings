/**
 * Electron `webUtils` module for resolving renderer-side objects to file system paths.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebUtils {
  /**
   * Returns the file system path the given file points to.
   *
   * @param file - The file to resolve.
   * @returns The absolute path of the file.
   */
  getPathForFile(file: File): string;
}
