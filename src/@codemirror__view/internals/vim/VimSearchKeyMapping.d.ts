import type { VimKeyMappingBase } from './VimKeyMappingBase.d.ts';
import type { VimSearchArgs } from './VimSearchArgs.d.ts';

/**
 * A key mapping that starts a search.
 *
 * @public
 * @unofficial
 */
export interface VimSearchKeyMapping extends VimKeyMappingBase {
  /**
   * The arguments describing how the search runs.
   */
  searchArgs: VimSearchArgs;

  /**
   * Discriminates this mapping as a search.
   */
  type: 'search';
}
