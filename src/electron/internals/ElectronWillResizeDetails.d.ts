/**
 * Details about a pending window resize, emitted with the `will-resize` event.
 *
 * @public
 * @unofficial
 */
export interface ElectronWillResizeDetails {
  /** The edge of the window being dragged for resizing. */
  edge: 'bottom-left' | 'bottom-right' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right';
}
