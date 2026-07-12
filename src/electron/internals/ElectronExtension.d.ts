/**
 * A loaded Chrome extension.
 *
 * @public
 * @unofficial
 */
export interface ElectronExtension {
  /** The extension id. */
  id: string;

  /** Copy of the extension's manifest data. */
  manifest: unknown;

  /** The extension name. */
  name: string;

  /** The extension's file path. */
  path: string;

  /** The extension's `chrome-extension://` URL. */
  url: string;

  /** The extension version. */
  version: string;
}
