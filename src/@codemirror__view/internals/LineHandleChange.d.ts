import type { ChangeDesc } from '../../@codemirror__state/internals/ChangeDesc.d.ts';

/**
 * Describes a change applied to a line handle.
 *
 * @public
 * @unofficial
 */
export interface LineHandleChange {
  /**
   * The change description associated with this line handle update.
   */
  changes: ChangeDesc;
}
