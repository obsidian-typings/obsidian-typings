/**
 * The federated event system of a renderer.
 *
 * @public
 * @unofficial
 */
export interface PixiEventSystem {
  /**
   * Sets the element the event system listens on.
   *
   * @param element - The element to receive the DOM events from.
   */
  setTargetElement(element: HTMLElement): void;
}
