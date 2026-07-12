/**
 * Options for relaunching the application.
 *
 * @public
 * @unofficial
 */
export interface ElectronRelaunchOptions {
  /** The command line arguments to pass to the relaunched instance. */
  args?: string[];

  /** The executable to run for the relaunch instead of the current app. */
  execPath?: string;
}
