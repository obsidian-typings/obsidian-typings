/**
 * Represents an embedded file reference within a canvas node.
 * @public
 * @unofficial
 */
export interface CanvasEmbed {
  /** Path to the embedded file. */
  file: string;

  /** Optional subpath within the file (e.g., heading or block reference). */
  subpath?: string;
}
