/**
 * A file record the Sync server pushed, as kept in {@link SyncPluginInstance.serverFiles}.
 *
 * @public
 * @unofficial
 */
export interface SyncServerFile {
  /** The creation time, in milliseconds since the epoch. */
  ctime: number;

  /** Whether the file was deleted or renamed away. */
  deleted: boolean;

  /** The name of the device that pushed the file. */
  device: string;

  /** Whether the entry is a folder. */
  folder: boolean;

  /** The content hash. */
  hash: string;

  /** Whether the record arrived during the initial sync. */
  initial?: boolean;

  /** The modification time, in milliseconds since the epoch. */
  mtime: number;

  /** The vault path. */
  path: string;

  /** The size in bytes. */
  size: number;

  /** The server version of the record. */
  uid: number;

  /** The id of the user who pushed the file. */
  user: number;
}
