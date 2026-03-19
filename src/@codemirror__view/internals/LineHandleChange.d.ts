import type { ChangeDesc } from '@codemirror/state';

/**
 * Describes a change applied to a line handle.
 *
 * @public
 * @unofficial
 */
export interface LineHandleChange {
  /** The change description associated with this line handle update. */
  changes: ChangeDesc;
}
