/**
 * Options for querying the app's login item settings.
 *
 * @public
 * @unofficial
 */
export interface ElectronLoginItemSettingsOptions {
  /**
   * The command-line arguments to compare against. Windows only.
   *
   * @default `[]`
   */
  args?: string[];

  /** The executable path to compare against. Windows only. */
  path?: string;
}
