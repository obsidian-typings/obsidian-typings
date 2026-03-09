/**
 * Options for installing a theme from a repository.
 * @public
 * @unofficial
 */
export interface InstallThemeOptions {
  /** Author of the theme. */
  author: string;

  /** Display name of the theme. */
  name: string;

  /** GitHub repository identifier (e.g. "username/repo"). */
  repo: string;
}
