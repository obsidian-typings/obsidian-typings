/**
 * A sentinel value that can be returned from key handlers to indicate the key should be handled by the next handler.
 *
 * @public
 * @unofficial
 */
export interface Cm5Pass {
  /** Returns the string "CodeMirror.PASS". */
  toString(): 'CodeMirror.PASS';
}
