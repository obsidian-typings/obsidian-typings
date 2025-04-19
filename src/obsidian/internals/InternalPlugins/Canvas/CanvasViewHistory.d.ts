import type { CanvasViewData } from './CanvasData.d.ts';

/** @public @unofficial */
export interface CanvasViewHistory {
    current: number;
    data: CanvasViewData[];
    max: number;

    canRedo(): unknown;
    canUndo(): unknown;
    clear(): unknown;
    push(arg1: unknown): unknown;
    redo(): unknown;
    replace(arg1: unknown): unknown;
    undo(): unknown;
}
