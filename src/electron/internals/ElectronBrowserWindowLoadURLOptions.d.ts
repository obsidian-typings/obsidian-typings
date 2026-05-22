/**
 * Options for loading a URL into a BrowserWindow.
 *
 * @public
 * @unofficial
 */
export interface ElectronBrowserWindowLoadURLOptions {
  /** Extra headers for the request. */
  extraHeaders?: string;

  /** The HTTP referrer URL. */
  httpReferrer?: string;

  /** The user agent string. */
  userAgent?: string;
}
