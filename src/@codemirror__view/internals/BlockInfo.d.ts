/**
 * Information about a block-level element in the editor view.
 *
 * @public
 * @unofficial
 */
export interface BlockInfo {
  /** The start position of the block. */
  readonly from: number;

  /** The height of the block in pixels. */
  readonly height: number;

  /** The length of the block in the document. */
  readonly length: number;

  /** The top position of the block in pixels. */
  readonly top: number;
}
