import type { CanvasViewData } from './CanvasData.d.ts';

/**
 * Manages undo/redo history for canvas state changes.
 * @public
 * @unofficial
 */
export interface CanvasViewHistory {
    /** Index of the current state in the history stack. */
    current: number;

    /** Array of historical canvas states. */
    data: CanvasViewData[];

    /** Maximum number of history entries to retain. */
    max: number;

    /** Check whether a redo operation is available. */
    canRedo(): unknown;

    /** Check whether an undo operation is available. */
    canUndo(): unknown;

    /** Clear all history entries. */
    clear(): unknown;

    /** Push a new state onto the history stack. */
    push(arg1: unknown): unknown;

    /** Redo the last undone action and return the restored state. */
    redo(): unknown;

    /** Replace the current history entry with a new state. */
    replace(arg1: unknown): unknown;

    /** Undo the last action and return the previous state. */
    undo(): unknown;
}
