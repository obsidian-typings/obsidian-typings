import type { CanvasViewData } from './CanvasData.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface CanvasViewHistory {
    /** @todo Documentation incomplete. */
    current: number;

    /** @todo Documentation incomplete. */
    data: CanvasViewData[];

    /** @todo Documentation incomplete. */
    max: number;

    /** @todo Documentation incomplete. */
    canRedo(): unknown;

    /** @todo Documentation incomplete. */
    canUndo(): unknown;

    /** @todo Documentation incomplete. */
    clear(): unknown;

    /** @todo Documentation incomplete. */
    push(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    redo(): unknown;

    /** @todo Documentation incomplete. */
    replace(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    undo(): unknown;
}
