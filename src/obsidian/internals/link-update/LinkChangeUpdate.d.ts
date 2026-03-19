import type { ReferenceCache } from 'obsidian';

/**
 * Describes a single link change to apply when a file is renamed or moved.
 *
 * @public
 * @unofficial
 */
export interface LinkChangeUpdate {
  /** New link text to replace the old reference with. */
  change: string;

  /** The cached reference that needs to be updated. */
  reference: ReferenceCache;

  /** Path of the file containing the link to update. */
  sourcePath: string;
}
