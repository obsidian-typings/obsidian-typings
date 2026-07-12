/**
 * Response object returned by an `onHeadersReceived` web-request listener callback.
 *
 * @public
 * @unofficial
 */
export interface ElectronHeadersReceivedResponse {
  /** Whether to cancel the request. */
  cancel?: boolean;

  /** When provided, the server is assumed to have responded with these headers. */
  responseHeaders?: Record<string, string | string[]>;

  /** Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used. */
  statusLine?: string;
}
