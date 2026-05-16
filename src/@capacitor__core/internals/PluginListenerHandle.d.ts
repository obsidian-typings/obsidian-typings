/**
 * Plugin listener handle.
 *
 * @public
 * @unofficial
 */
export interface PluginListenerHandle {
  /**
   * Removes the listener.
   *
   * @returns Promise that resolves when the listener is removed.
   */
  remove(): Promise<void>;
}
