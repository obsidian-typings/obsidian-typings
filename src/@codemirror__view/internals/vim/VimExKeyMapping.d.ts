import type { VimKeyMappingBase } from './VimKeyMappingBase.d.ts';

/**
 * A key mapping that opens the Ex command prompt.
 *
 * @public
 * @unofficial
 */
export interface VimExKeyMapping extends VimKeyMappingBase {
  /**
   * Discriminates this mapping as an Ex prompt binding.
   */
  type: 'ex';
}
