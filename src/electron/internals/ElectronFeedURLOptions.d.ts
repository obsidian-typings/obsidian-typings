/**
 * Options for configuring the auto updater feed URL.
 *
 * @public
 * @unofficial
 */
export interface ElectronFeedURLOptions {
  /**
   * HTTP request headers (macOS only).
   */
  headers?: Record<string, string>;

  /**
   * Can be `json` or `default`, see the Squirrel.Mac README for more information (macOS only).
   */
  serverType?: 'default' | 'json';

  /** The feed URL. */
  url: string;
}
