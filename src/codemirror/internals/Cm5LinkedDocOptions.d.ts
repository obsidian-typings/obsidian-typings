import type { Cm5ModeSpec } from './Cm5ModeSpec.d.ts';

/**
 * Options for creating a linked document in CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export interface Cm5LinkedDocOptions {
  /** The start line of the subview. */
  from?: number;
  /** A different mode for the linked document. */
  mode?: Cm5ModeSpec<unknown> | string;
  /** Whether to share undo history with the original. */
  sharedHist?: boolean;
  /** The end line of the subview. */
  to?: number;
}
