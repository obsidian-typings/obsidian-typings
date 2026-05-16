/**
 * 2D transformation matrix.
 *
 * @public
 * @unofficial
 */
export declare class Matrix {
  /** Scale X. */
  a: number;

  /** Shear Y. */
  b: number;

  /** Shear X. */
  c: number;

  /** Scale Y. */
  d: number;

  /** Translate X. */
  tx: number;

  /** Translate Y. */
  ty: number;
}
