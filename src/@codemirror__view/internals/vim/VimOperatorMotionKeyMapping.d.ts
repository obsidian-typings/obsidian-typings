import type { VimKeyMappingBase } from './VimKeyMappingBase.d.ts';
import type { VimMotionArgs } from './VimMotionArgs.d.ts';
import type { VimOperatorArgs } from './VimOperatorArgs.d.ts';
import type { VimOperatorMotionArgs } from './VimOperatorMotionArgs.d.ts';

/**
 * A key mapping that pairs an operator with its motion in one binding, as `dd` and `yy` do.
 *
 * @public
 * @unofficial
 */
export interface VimOperatorMotionKeyMapping extends VimKeyMappingBase {
  /**
   * The name the motion was registered under.
   */
  motion: string;

  /**
   * The arguments passed to the motion.
   */
  motionArgs?: VimMotionArgs;

  /**
   * The name the operator was registered under.
   */
  operator: string;

  /**
   * The arguments passed to the operator.
   */
  operatorArgs?: VimOperatorArgs;

  /**
   * The arguments applied to the pairing itself.
   */
  operatorMotionArgs?: VimOperatorMotionArgs;

  /**
   * Discriminates this mapping as an operator-motion pair.
   */
  type: 'operatorMotion';
}
