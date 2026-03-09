import type { TAbstractFile } from 'obsidian';

/**
 * Represents a draggable item in the drag-and-drop system.
 * @public
 * @unofficial
 */
export interface Draggable {
  /** Single file being dragged, if applicable. */
  file?: TAbstractFile;

  /** Multiple files being dragged, if applicable. */
  files?: TAbstractFile[];

  /** Icon identifier for the drag ghost element. */
  icon: string;

  /** Link text for link-type drags. */
  linktext?: string;

  /** Source component that initiated the drag. */
  source?: unknown;

  /** Path of the source file for link resolution. */
  sourcePath?: string;

  /** Display title shown on the drag ghost element. */
  title: string;

  /** Type of draggable (e.g. "file", "folder", "link"). */
  type: string;
}
