/**
 * Options for {@link ElectronBrowserWindow.loadFile}.
 *
 * @public
 * @unofficial
 */
export interface ElectronBrowserWindowLoadFileOptions {
  /** Passed to `url.format()`. */
  hash?: string;

  /** Passed to `url.format()`. */
  query?: Record<string, string>;

  /** Passed to `url.format()`. */
  search?: string;
}
