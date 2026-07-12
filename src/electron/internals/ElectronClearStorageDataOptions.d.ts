/**
 * Options controlling which storage data is cleared.
 *
 * @public
 * @unofficial
 */
export interface ElectronClearStorageDataOptions {
  /** Should follow `window.location.origin`'s representation `scheme://host:port`. */
  origin?: string;

  /** The types of quotas to clear, can contain `persistent`, `syncable` or `temporary`. If not specified, clear all quotas. */
  quotas?: string[];

  /** The types of storages to clear. If not specified, clear all storage types. */
  storages?: string[];
}
