import type { Cm5EditorChange } from '../Cm5EditorChange.d.ts';
import type { Position } from '../Position.d.ts';

/**
 * Computes the end position of a change.
 *
 * @public
 * @unofficial
 */
export declare const changeEnd: (change: Cm5EditorChange) => Position;
