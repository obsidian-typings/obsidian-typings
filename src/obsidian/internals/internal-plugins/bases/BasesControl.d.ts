import type { RenderContext } from 'obsidian';

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
   * @param renderContext - The render context.
   */
  renderTo(containerEl: HTMLElement, renderContext: RenderContext): void;
}
