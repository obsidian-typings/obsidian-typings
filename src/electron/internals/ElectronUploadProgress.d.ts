/**
 * Progress information about the upload portion of a `ClientRequest`.
 *
 * @public
 * @unofficial
 */
export interface ElectronUploadProgress {
  /** Whether the request is currently active. If this is `false` no other properties will be set. */
  active: boolean;

  /** The number of bytes that have been uploaded so far. */
  current: number;

  /** Whether the upload has started. If this is `false` both `current` and `total` will be set to `0`. */
  started: boolean;

  /** The number of bytes that will be uploaded this request. */
  total: number;
}
