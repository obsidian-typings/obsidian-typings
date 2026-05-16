import type { Position } from '../Position.d.ts';

/**
 * A constructor function for creating {@link Position} objects.
 *
 * @public
 * @unofficial
 */
export declare const Pos: (line: number, ch?: number, sticky?: string) => Position;
