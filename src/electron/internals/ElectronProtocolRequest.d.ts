import type { ElectronUploadData } from './ElectronUploadData.d.ts';

/**
 * A request passed to a protocol handler.
 *
 * @public
 * @unofficial
 */
export interface ElectronProtocolRequest {
  /** The request headers. */
  headers: Record<string, string>;

  /** The HTTP request method. */
  method: string;

  /** The referrer URL. */
  referrer: string;

  /** The upload data for the request. */
  uploadData?: ElectronUploadData[];

  /** The request URL. */
  url: string;
}
