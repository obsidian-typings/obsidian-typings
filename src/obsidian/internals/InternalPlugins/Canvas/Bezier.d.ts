import type { Point } from 'obsidian';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface Bezier {
    /** @todo Documentation incomplete. */
    cp1: Point;

    /** @todo Documentation incomplete. */
    cp2: Point;

    /** @todo Documentation incomplete. */
    from: Point;

    /** @todo Documentation incomplete. */
    path: string;

    /** @todo Documentation incomplete. */
    to: Point;
}
