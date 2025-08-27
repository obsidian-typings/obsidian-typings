import type { RenderContext } from '../../RenderContext.d.ts';

/**
 * Bases control.
 *
 * @public
 * @unofficial
 */
export interface BasesControl {
    /**
     * Render to.
     *
     * @param containerEl - The container element.
     * @param t - The data to render.
     */
    renderTo(containerEl: HTMLElement, renderContext: RenderContext): void;
}
