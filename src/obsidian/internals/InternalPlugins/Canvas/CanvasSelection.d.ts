import type { BBox } from './BBox.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface CanvasSelection {
    /** @todo Documentation incomplete. */
    bbox: BBox;

    /** @todo Documentation incomplete. */
    canvas: CanvasViewCanvas;

    /** @todo Documentation incomplete. */
    resizerEls: HTMLDivElement[];

    /** @todo Documentation incomplete. */
    selectionEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    hide(): unknown;

    /** @todo Documentation incomplete. */
    onResizePointerdown(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    update(arg1: unknown): unknown;
}
