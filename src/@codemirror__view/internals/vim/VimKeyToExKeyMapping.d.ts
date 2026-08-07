import type { VimExCommandParams } from './VimExCommandParams.d.ts';
import type { VimKeyMappingBase } from './VimKeyMappingBase.d.ts';

/**
 * A key mapping that runs a fixed Ex command, as created by mapping a key sequence to a `:` command.
 *
 * @public
 * @unofficial
 */
export interface VimKeyToExKeyMapping extends VimKeyMappingBase {
  /**
   * The Ex command run when the keys are typed.
   */
  exArgs: VimExCommandParams;

  /**
   * Discriminates this mapping as a key-to-Ex binding.
   */
  type: 'keyToEx';
}
