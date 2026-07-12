/**
 * Details of a shortcut link used by `readShortcutLink` and `writeShortcutLink`.
 *
 * @public
 * @unofficial
 */
export interface ElectronShortcutDetails {
  /**
   * The Application User Model ID.
   *
   * @default `''`
   */
  appUserModelId?: string;

  /**
   * The arguments to be applied to `target` when launching from this shortcut.
   *
   * @default `''`
   */
  args?: string;

  /**
   * The working directory.
   *
   * @default `''`
   */
  cwd?: string;

  /**
   * The description of the shortcut.
   *
   * @default `''`
   */
  description?: string;

  /**
   * The path to the icon, can be a DLL or EXE. `icon` and `iconIndex` have to be set together. An empty value uses the target's icon.
   *
   * @default `''`
   */
  icon?: string;

  /**
   * The resource ID of icon when `icon` is a DLL or EXE.
   *
   * @default `0`
   */
  iconIndex?: number;

  /** The target to launch from this shortcut. */
  target: string;

  /** The Application Toast Activator CLSID. Needed for participating in Action Center. */
  toastActivatorClsid?: string;
}
