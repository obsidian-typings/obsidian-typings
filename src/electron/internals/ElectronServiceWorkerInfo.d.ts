/**
 * Information about a running service worker.
 *
 * @public
 * @unofficial
 */
export interface ElectronServiceWorkerInfo {
  /** The virtual ID of the process that this service worker is running in. Not an OS-level PID. */
  renderProcessId: number;

  /** The base URL that this service worker is active for. */
  scope: string;

  /** The full URL to the script that this service worker runs. */
  scriptUrl: string;
}
