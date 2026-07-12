/**
 * Settings for the app's login item.
 *
 * @public
 * @unofficial
 */
export interface ElectronSettings {
  /**
   * The command-line arguments to pass to the executable. Windows only.
   *
   * @default `[]`
   */
  args?: string[];

  /**
   * `true` to change the startup approved registry key and enable/disable the app in Task Manager and
   * Windows settings. Windows only.
   *
   * @default `true`
   */
  enabled?: boolean;

  /** Value name to write into registry. Defaults to the app's AppUserModelId. Windows only. */
  name?: string;

  /**
   * `true` to open the app as hidden. Not available on MAS builds. macOS only.
   *
   * @default `false`
   */
  openAsHidden?: boolean;

  /**
   * `true` to open the app at login, `false` to remove the app as a login item.
   *
   * @default `false`
   */
  openAtLogin?: boolean;

  /** The executable to launch at login. Windows only. */
  path?: string;
}
