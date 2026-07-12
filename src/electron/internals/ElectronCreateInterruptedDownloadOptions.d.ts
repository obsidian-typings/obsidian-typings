/**
 * Options used to resume a cancelled or interrupted download from a previous session.
 *
 * @public
 * @unofficial
 */
export interface ElectronCreateInterruptedDownloadOptions {
  /** ETag header value. */
  eTag?: string;

  /** Last-Modified header value. */
  lastModified?: string;

  /** Total length of the download. */
  length: number;

  /** The MIME type of the download. */
  mimeType?: string;

  /** Start range for the download. */
  offset: number;

  /** Absolute path of the download. */
  path: string;

  /** Time when the download was started in number of seconds since the UNIX epoch. */
  startTime?: number;

  /** Complete URL chain for the download. */
  urlChain: string[];
}
