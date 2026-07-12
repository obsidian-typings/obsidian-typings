/**
 * Options controlling how an extension is loaded.
 *
 * @public
 * @unofficial
 */
export interface ElectronLoadExtensionOptions {
  /** Whether to allow the extension to read local files over the `file://` protocol and inject content scripts into `file://` pages. */
  allowFileAccess: boolean;
}
