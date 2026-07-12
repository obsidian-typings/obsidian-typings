/**
 * Filter used to narrow which requests a web-request listener receives.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebRequestFilter {
  /** Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. */
  urls: string[];
}
