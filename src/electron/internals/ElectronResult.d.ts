import type { ElectronRectangle } from './ElectronRectangle.d.ts';

/**
 * The result of a find-in-page request.
 *
 * @public
 * @unofficial
 */
export interface ElectronResult {
  /** Position of the active match. */
  activeMatchOrdinal: number;

  /** Whether this is the final update for the request. */
  finalUpdate: boolean;

  /** Number of matches. */
  matches: number;

  /** The request id used for the request. */
  requestId: number;

  /** Coordinates of the first match region. */
  selectionArea: ElectronRectangle;
}
