import type { VimKeyMappingBase } from './VimKeyMappingBase.d.ts';
import type { VimMotionArgs } from './VimMotionArgs.d.ts';

/**
 * A key mapping that runs a motion, moving the cursor without changing the document.
 *
 * @public
 * @unofficial
 */
export interface VimMotionKeyMapping extends VimKeyMappingBase {
  /**
   * The name the motion was registered under.
   */
  motion: string;

  /**
   * The arguments passed to the motion.
   */
  motionArgs?: VimMotionArgs;

  /**
   * Discriminates this mapping as a motion.
   */
  type: 'motion';
}
