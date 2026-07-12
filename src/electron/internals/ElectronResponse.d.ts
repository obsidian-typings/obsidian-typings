/**
 * Response object returned by an `onBeforeRequest` web-request listener callback.
 *
 * @public
 * @unofficial
 */
export interface ElectronResponse {
  /** Whether to cancel the request. */
  cancel?: boolean;

  /** The original request is prevented from being sent or completed and is instead redirected to the given URL. */
  redirectURL?: string;
}
