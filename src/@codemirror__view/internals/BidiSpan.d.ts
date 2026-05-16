import type { Direction } from './Direction.d.ts';

/**
 * A span of text with a specific bidirectional text level.
 *
 * @public
 * @unofficial
 */
export declare class BidiSpan {
  /** The start position of the span. */
  readonly from: number;

  /** The bidirectional embedding level. */
  readonly level: number;

  /** The end position of the span. */
  readonly to: number;

  /** The text direction of this span. */
  get dir(): Direction;
}
