import type {
  ChangeSet,
  EditorSelection as CmEditorSelection,
  StateEffect
} from '@codemirror/state';

/**
 * Result returned from {@link EditorState.changeByRange}.
 *
 * @public
 * @unofficial
 */
export interface ChangeByRangeReturn {
  /** The combined change set. */
  changes: ChangeSet;
  /** The combined effects. */
  effects: readonly StateEffect<unknown>[];
  /** The updated selection. */
  selection: CmEditorSelection;
}
