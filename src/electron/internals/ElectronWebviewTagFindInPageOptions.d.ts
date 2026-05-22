/**
 * Options for finding text in a webview page.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebviewTagFindInPageOptions {
  /** Whether to continue the find from the last result. */
  findNext?: boolean;

  /** Whether to search forward. */
  forward?: boolean;

  /** Whether the search should be case-sensitive. */
  matchCase?: boolean;
}
