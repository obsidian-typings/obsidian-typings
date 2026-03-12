/**
 * Base data shared by all canvas node types.
 *
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasNodeUnknownData {
  /** Path to the associated file. */
  file: string;

  /** Unique identifier of the node. */
  id: string;

  /** Type of the canvas node (e.g. "text", "file", "link", "group"). */
  type: string;
}
