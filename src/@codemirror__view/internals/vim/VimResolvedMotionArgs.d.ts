import type { VimMotionArgs } from './VimMotionArgs.d.ts';

/**
 * {@link VimMotionArgs} as a motion handler receives them, once the command dispatcher has resolved
 * the repeat count.
 *
 * @public
 * @unofficial
 */
export interface VimResolvedMotionArgs extends VimMotionArgs {
  /**
   * How many times the motion is applied. Always resolved to a concrete count before the handler runs.
   */
  repeat: number;
}
