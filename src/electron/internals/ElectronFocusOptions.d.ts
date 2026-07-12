/**
 * Options for focusing the application.
 *
 * @public
 * @unofficial
 */
export interface ElectronFocusOptions {
  /** Make the receiver the active app even if another app is currently active. macOS only. */
  steal: boolean;
}
