/**
 * A closeable component that can get dismissed via the Android 'back' button.
 *
 * @public
 * @unofficial
 */
export interface CloseableComponent {
  /**
   * Close the component.
   */
  close(): void;
}
