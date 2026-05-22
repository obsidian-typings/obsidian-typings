import type {
  ChangeSpec,
  SelectionRange,
  StateEffect
} from '@codemirror/state';

/**
 * Result returned by the callback passed to {@link EditorState.changeByRange}.
 *
 * @public
 * @unofficial
 */
export interface ChangeByRangeResult {
  /** The updated changes. */
  changes?: ChangeSpec;
  /** The updated effects. */
  effects?: readonly StateEffect<unknown>[] | StateEffect<unknown>;
  /** The updated range. */
  range: SelectionRange;
}
