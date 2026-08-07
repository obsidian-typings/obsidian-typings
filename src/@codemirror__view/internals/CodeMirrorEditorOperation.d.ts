import type { ChangeSet } from '@codemirror/state';

/**
 * The batch of work an editor is in the middle of. Nested operations share one of these, and the
 * editor only reacts to what happened once the outermost one ends.
 *
 * @public
 * @unofficial
 */
export interface CodeMirrorEditorOperation {
  /**
   * How deeply operations are currently nested. The operation ends when this reaches zero.
   */
  $d: number;

  /**
   * The document changes made so far during this operation, used to map positions taken before them.
   */
  changes?: ChangeSet;

  /**
   * Whether the cursor moved during this operation.
   */
  cursorActivity?: boolean;

  /**
   * The text deleted during this operation.
   */
  deletedText?: string;

  /**
   * Whether this operation was started by the Vim layer.
   */
  isVimOp?: boolean;

  /**
   * The most recent change made during this operation.
   */
  lastChange?: unknown;
}
