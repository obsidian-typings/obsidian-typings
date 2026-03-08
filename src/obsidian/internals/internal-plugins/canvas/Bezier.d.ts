import type { Point } from 'obsidian';

/**
 * Bezier curve used for rendering canvas edge connections.
 * @public
 * @unofficial
 */
export interface Bezier {
    /** First control point of the Bezier curve. */
    cp1: Point;

    /** Second control point of the Bezier curve. */
    cp2: Point;

    /** Start point of the Bezier curve. */
    from: Point;

    /** SVG path string representation of the Bezier curve. */
    path: string;

    /** End point of the Bezier curve. */
    to: Point;
}
