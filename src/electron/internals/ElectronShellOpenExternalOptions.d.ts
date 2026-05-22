/**
 * Options for opening an external URL.
 *
 * @public
 * @unofficial
 */
export interface ElectronShellOpenExternalOptions {
  /** Whether to activate the opened application. */
  activate?: boolean;

  /** The working directory for the opened application. */
  workingDirectory?: string;
}
