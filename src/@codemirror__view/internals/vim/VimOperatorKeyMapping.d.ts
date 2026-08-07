import type { VimKeyMappingBase } from './VimKeyMappingBase.d.ts';
import type { VimOperatorArgs } from './VimOperatorArgs.d.ts';

/**
 * A key mapping that runs an operator, which transforms the range a following motion selects.
 *
 * @public
 * @unofficial
 */
export interface VimOperatorKeyMapping extends VimKeyMappingBase {
  /**
   * The name the operator was registered under.
   */
  operator: string;

  /**
   * The arguments passed to the operator.
   */
  operatorArgs?: VimOperatorArgs;

  /**
   * Discriminates this mapping as an operator.
   */
  type: 'operator';
}
