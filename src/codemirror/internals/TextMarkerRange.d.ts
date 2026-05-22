import type { Position } from './Position.d.ts';

/**
 * The range of a text marker.
 *
 * @public
 * @unofficial
 */
export interface TextMarkerRange {
  /** The start position of the marker. */
  from: Position;
  /** The end position of the marker. */
  to: Position;
}
