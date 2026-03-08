import type { CanvasViewData } from './CanvasData.d.ts';

/**
 * Manages undo/redo history for canvas state changes.
 * @public
 * @unofficial
 */
export interface CanvasViewHistory {
    /**
     * Check whether a redo operation is available.
     *
     * @returns Whether redo is available.
     */
    canRedo(): unknown;

    /**
     * Check whether an undo operation is available.
     *
     * @returns Whether undo is available.
     */
    canUndo(): unknown;

    /**
     * Clear all history entries.
     *
     * @returns The result of clearing the history.
     */
    clear(): unknown;

    /** Index of the current state in the history stack. */
    current: number;

    /** Array of historical canvas states. */
    data: CanvasViewData[];

    /** Maximum number of history entries to retain. */
    max: number;

    /**
     * Push a new state onto the history stack.
     *
     * @returns The result of pushing the state.
     */
    push(arg1: unknown): unknown;

    /**
     * Redo the last undone action and return the restored state.
     *
     * @returns The restored state.
     */
    redo(): unknown;

    /**
     * Replace the current history entry with a new state.
     *
     * @returns The result of replacing the history entry.
     */
    replace(arg1: unknown): unknown;

    /**
     * Undo the last action and return the previous state.
     *
     * @returns The previous state.
     */
    undo(): unknown;
}
