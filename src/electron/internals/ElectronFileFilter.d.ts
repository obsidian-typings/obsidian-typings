/**
 * File filter for Electron dialog file type selection.
 *
 * @public
 * @unofficial
 */
export interface ElectronFileFilter {
  /** The file extensions to filter (without dots). */
  extensions: string[];

  /** The display name of the filter. */
  name: string;
}
