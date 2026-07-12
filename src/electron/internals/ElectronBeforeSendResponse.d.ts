/**
 * Response object returned by an `onBeforeSendHeaders` web-request listener callback.
 *
 * @public
 * @unofficial
 */
export interface ElectronBeforeSendResponse {
  /** Whether to cancel the request. */
  cancel?: boolean;

  /** When provided, request will be made with these headers. */
  requestHeaders?: Record<string, string | string[]>;
}
