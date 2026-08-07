import type { VimActionArgs } from './VimActionArgs.d.ts';
import type { VimKeyMappingBase } from './VimKeyMappingBase.d.ts';

/**
 * A key mapping that runs an action — a self-contained command that needs no motion to complete it.
 *
 * @public
 * @unofficial
 */
export interface VimActionKeyMapping extends VimKeyMappingBase {
  /**
   * The name the action was registered under.
   */
  action: string;

  /**
   * The arguments passed to the action.
   */
  actionArgs?: VimActionArgs;

  /**
   * The motion the action runs, for actions that move the cursor as part of their work.
   */
  motion?: string;

  /**
   * The operator the action runs, for actions that transform text as part of their work.
   */
  operator?: string;

  /**
   * Discriminates this mapping as an action.
   */
  type: 'action';
}
