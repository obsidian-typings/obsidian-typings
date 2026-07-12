/**
 * Information about a shared worker.
 *
 * @public
 * @unofficial
 */
export interface ElectronSharedWorkerInfo {
  /** The unique id of the shared worker. */
  id: string;

  /** The url of the shared worker. */
  url: string;
}
