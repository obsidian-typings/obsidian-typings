/**
 * Arguments applied to the motion half of an operator-motion key mapping, such as `dd` or `yy`.
 *
 * @public
 * @unofficial
 */
export interface VimOperatorMotionArgs {
  /**
   * Whether the motion covers whole lines rather than a character range.
   */
  visualLine?: boolean;
}
