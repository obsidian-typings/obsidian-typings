import type { VimActionArgs } from './VimActionArgs.d.ts';

/**
 * {@link VimActionArgs} as an action handler receives them, once the command dispatcher has resolved
 * the repeat count.
 *
 * @public
 * @unofficial
 */
export interface VimResolvedActionArgs extends VimActionArgs {
  /**
   * How many times the action is applied. Always resolved to a concrete count before the handler runs.
   */
  repeat: number;
}
