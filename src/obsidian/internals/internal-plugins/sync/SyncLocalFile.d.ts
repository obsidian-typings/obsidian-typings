/**
 * A local file record Sync keeps, as kept in {@link SyncPluginInstance.localFiles}.
 *
 * @public
 * @unofficial
 */
export interface SyncLocalFile {
  /** The creation time, in milliseconds since the epoch; `0` for a folder. */
  ctime: number;

  /** Whether the entry is a folder. */
  folder: boolean;

  /** The content hash; empty when the file changed since it was last hashed, and for a folder. */
  hash: string;

  /** The modification time, in milliseconds since the epoch; `0` for a folder. */
  mtime: number;

  /** The vault path. */
  path: string;

  /** The path the file had before a rename not yet pushed to the server; empty when there is none. */
  previouspath: string;

  /** The size in bytes; `0` for a folder. */
  size: number;

  /** The content hash last pushed to or downloaded from the server; empty when there is none. */
  synchash: string;

  /** When the file was last pushed, in milliseconds since the epoch; `0` when it has a change still to push. */
  synctime: number;
}
