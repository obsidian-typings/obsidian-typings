/**
 * Options for the application's about panel.
 *
 * @public
 * @unofficial
 */
export interface ElectronAboutPanelOptionsOptions {
  /** The app's name. */
  applicationName?: string;

  /** The app's version. */
  applicationVersion?: string;

  /** List of app authors. Linux only. */
  authors?: string[];

  /** Copyright information. */
  copyright?: string;

  /** Credit information. macOS and Windows only. */
  credits?: string;

  /** Path to the app's icon in a JPEG or PNG file format. Linux and Windows only. */
  iconPath?: string;

  /** The app's build version number. macOS only. */
  version?: string;

  /** The app's website. Linux only. */
  website?: string;
}
