import type { VimKeyMappingBase } from './VimKeyMappingBase.d.ts';

/**
 * A key mapping that swallows its keys and does nothing, so a prefix does not fall through to another
 * binding.
 *
 * @public
 * @unofficial
 */
export interface VimIdleKeyMapping extends VimKeyMappingBase {
  /**
   * Discriminates this mapping as an idle binding.
   */
  type: 'idle';
}
