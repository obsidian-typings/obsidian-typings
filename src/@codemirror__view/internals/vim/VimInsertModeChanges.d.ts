import type { VimInsertModeChange } from './VimInsertModeChange.d.ts';

/**
 * The edits made during one insert-mode session, kept so that `.` and macros can replay them.
 *
 * @public
 * @unofficial
 */
export interface VimInsertModeChanges {
  /**
   * The recorded edits, in the order they were made.
   */
  changes: VimInsertModeChange[];

  /**
   * Whether a change has been made that has not yet been followed by a cursor activity event.
   */
  expectCursorActivityForChange: boolean;

  /**
   * How many of the recorded changes are skipped when the insertion is replayed.
   */
  ignoreCount?: number;

  /**
   * Whether the recording is discarded and started over on the next change.
   */
  maybeReset?: boolean;

  /**
   * How many lines the insertion spanned, when it was made in visual block mode.
   */
  visualBlock?: number;
}
