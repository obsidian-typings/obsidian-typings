/**
 * Options for destroying a display object.
 *
 * @public
 * @unofficial
 */
export interface IDestroyOptions {
  /** Whether to destroy the base texture. */
  baseTexture?: boolean;

  /** Whether to destroy children. */
  children?: boolean;

  /** Whether to destroy the texture. */
  texture?: boolean;
}
