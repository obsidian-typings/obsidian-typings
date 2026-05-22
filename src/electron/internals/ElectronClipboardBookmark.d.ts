/**
 * A bookmark read from the clipboard.
 *
 * @public
 * @unofficial
 */
export interface ElectronClipboardBookmark {
  /** The bookmark title. */
  title: string;

  /** The bookmark URL. */
  url: string;
}
