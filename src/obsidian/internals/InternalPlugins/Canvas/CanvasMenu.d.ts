import type { CanvasSelection } from './CanvasSelection.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface CanvasMenu {
    /** @todo Documentation incomplete. */
    canvas: CanvasViewCanvas;

    /** @todo Documentation incomplete. */
    containerEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    menuEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    selection: CanvasSelection;

    /** @todo Documentation incomplete. */
    render(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    updateZIndex(arg1: unknown): unknown;
}
