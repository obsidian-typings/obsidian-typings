/**
 * The state {@link SyncPluginInstance.getStatus} reports.
 *
 * @public
 * @unofficial
 */
export type SyncStatus =
  | 'disconnected'
  | 'error'
  | 'paused'
  | 'synced'
  | 'syncing'
  | 'uninitialized';
