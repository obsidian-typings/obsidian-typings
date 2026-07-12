/**
 * Options for the window's taskbar button (Windows only).
 *
 * @public
 * @unofficial
 */
export interface ElectronAppDetailsOptions {
  /**
   * Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set.
   *
   * @default `0`
   */
  appIconIndex?: number;

  /** Window's Relaunch Icon. */
  appIconPath?: string;

  /** Window's App User Model ID. It has to be set, otherwise the other options will have no effect. */
  appId?: string;

  /** Window's Relaunch Command. */
  relaunchCommand?: string;

  /** Window's Relaunch Display Name. */
  relaunchDisplayName?: string;
}
