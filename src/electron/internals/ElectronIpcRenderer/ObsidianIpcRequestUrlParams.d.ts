/**
 * The request Obsidian's `request-url` IPC channel sends through Electron's `net` module, following redirects.
 *
 * @public
 * @unofficial
 */
export interface ObsidianIpcRequestUrlParams {
  /** The request body. Any other type is not sent. */
  body?: ArrayBuffer | string;

  /** The `Content-Type` header. */
  contentType?: string;

  /** Additional request headers. A header Electron refuses to set is logged and skipped. */
  headers?: Record<string, string>;

  /** The HTTP method. Electron defaults to `GET`. */
  method?: string;

  /** The URL to request. */
  url: string;
}
