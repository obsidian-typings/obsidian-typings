import type { ElectronLaunchItems } from './ElectronLaunchItems.d.ts';

/**
 * The app's login item settings.
 *
 * @public
 * @unofficial
 */
export interface ElectronLoginItemSettings {
  /**
   * `true` if app is set to open at login and its run key is not deactivated. Differs from
   * `openAtLogin` as it ignores the `args` option. Windows only.
   */
  executableWillLaunchAtLogin: boolean;

  /** The list of registry-backed launch items. Windows only. */
  launchItems: ElectronLaunchItems[];

  /** `true` if the app is set to open as hidden at login. Not available on MAS builds. macOS only. */
  openAsHidden: boolean;

  /** `true` if the app is set to open at login. */
  openAtLogin: boolean;

  /**
   * `true` if the app was opened as a login item that should restore the state from the previous
   * session. Not available on MAS builds. macOS only.
   */
  restoreState: boolean;

  /** `true` if the app was opened as a hidden login item. Not available on MAS builds. macOS only. */
  wasOpenedAsHidden: boolean;

  /** `true` if the app was opened at login automatically. Not available on MAS builds. macOS only. */
  wasOpenedAtLogin: boolean;
}
