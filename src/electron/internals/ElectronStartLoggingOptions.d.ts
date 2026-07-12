/**
 * Options controlling how network events are captured when logging starts.
 *
 * @public
 * @unofficial
 */
export interface ElectronStartLoggingOptions {
  /** What kinds of data should be captured. `includeSensitive` adds cookies and auth data; `everything` adds all bytes transferred on sockets. */
  captureMode?: 'default' | 'everything' | 'includeSensitive';

  /** When the log grows beyond this size, logging will automatically stop. */
  maxFileSize?: number;
}
