/**
 * A file change the Publish changes dialog lists, as produced by its scan for changes.
 *
 * @public
 * @unofficial
 */
export interface PublishFileDiff {
  /** Whether the change is selected for publishing. */
  checked: boolean;

  /** The creation time on the site, in milliseconds since the epoch; `0` for a new file. */
  ctime: number;

  /** The modification time on the site, in milliseconds since the epoch; `0` for a new file. */
  mtime: number;

  /** The vault path. */
  path: string;

  /** The size on the site in bytes; `0` for a new file. */
  size: number;

  /**
   * The kind of change: `changed` differs from the site, `deleted` is on the site but not in the vault,
   * `new` is in the vault but not on the site, and `to-delete` is unchanged and can be removed.
   */
  type: 'changed' | 'deleted' | 'new' | 'to-delete';
}
