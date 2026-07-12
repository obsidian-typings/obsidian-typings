/**
 * Options for finding text in a webview page.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebviewTagFindInPageOptions {
  /**
   * Whether to begin a new text finding session with this request. Should be `true` for initial requests, and `false` for follow-up requests.
   *
   * @default `false`
   */
  findNext?: boolean;

  /**
   * Whether to search forward or backward.
   *
   * @default `true`
   */
  forward?: boolean;

  /**
   * Whether the search should be case-sensitive.
   *
   * @default `false`
   */
  matchCase?: boolean;
}
