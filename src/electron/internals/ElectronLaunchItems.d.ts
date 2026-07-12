/**
 * A registry-backed login launch item on Windows.
 *
 * @public
 * @unofficial
 */
export interface ElectronLaunchItems {
  /** The command-line arguments to pass to the executable. Windows only. */
  args: string[];

  /** `true` if the app registry key is startup approved and therefore shows as enabled in Task Manager and Windows settings. Windows only. */
  enabled: boolean;

  /** Name value of a registry entry. Windows only. */
  name: string;

  /** The executable to an app that corresponds to a registry entry. Windows only. */
  path: string;

  /** One of `user` or `machine`. Indicates whether the registry entry is under `HKEY_CURRENT_USER` or `HKEY_LOCAL_MACHINE`. Windows only. */
  scope: string;
}
