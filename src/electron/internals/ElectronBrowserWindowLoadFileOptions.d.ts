/**
 * Options for loading a file into a BrowserWindow.
 *
 * @public
 * @unofficial
 */
export interface ElectronBrowserWindowLoadFileOptions {
  /** The hash fragment. */
  hash?: string;

  /** The query parameters. */
  query?: Record<string, string>;

  /** The search string. */
  search?: string;
}
