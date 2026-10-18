/**
 * A section of the read view renderer representing a block of rendered content.
 *
 * @public
 * @unofficial
 */
export interface RendererSection {
  /**
   * Whether the section's height has been measured since its content last changed.
   */
  computed: boolean;

  /**
   * DOM element for this section.
   */
  el: HTMLElement;

  /**
   * Measured height of the section, in pixels.
   */
  height: number;

  /**
   * Raw HTML content for this section.
   */
  html: string;

  /**
   * Whether this section has been rendered to the DOM.
   */
  rendered: boolean;

  /**
   * Mark the section's height as stale, so the next render measures it again.
   */
  resetCompute(): void;
}
