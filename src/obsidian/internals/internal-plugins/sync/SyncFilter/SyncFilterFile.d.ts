/**
 * A file entry that the selective-sync filter checks when its settings change.
 *
 * @public
 * @unofficial
 */
export interface SyncFilterFile {
  /** Whether the entry is a folder. */
  folder: boolean;

  /** The vault path. */
  path: string;
}
