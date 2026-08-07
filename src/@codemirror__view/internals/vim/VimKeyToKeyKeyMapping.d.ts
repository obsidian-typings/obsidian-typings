import type { VimKeyMappingBase } from './VimKeyMappingBase.d.ts';

/**
 * A key mapping that rewrites one key sequence into another, which is then matched again.
 *
 * @public
 * @unofficial
 */
export interface VimKeyToKeyKeyMapping extends VimKeyMappingBase {
  /**
   * The key sequence the mapped keys are rewritten to.
   */
  toKeys: string;

  /**
   * Discriminates this mapping as a key-to-key binding.
   */
  type: 'keyToKey';
}
