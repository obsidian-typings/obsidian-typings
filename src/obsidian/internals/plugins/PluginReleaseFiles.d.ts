/**
 * The contents of a community plugin's release files, as downloaded for {@link Plugins.installPlugin} and written by {@link Plugins.writePluginFiles}.
 *
 * @public
 * @unofficial
 */
export interface PluginReleaseFiles {
  /** Contents of `main.js`. */
  main: string;

  /** Contents of `manifest.json`. */
  manifest: string;

  /** Contents of `styles.css`, or `null` when the release has none. */
  styles: null | string;
}
