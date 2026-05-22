/**
 * A record of CSS selectors to style values for theme definitions.
 *
 * @public
 * @unofficial
 */
export interface EditorViewThemeSpec {
  /** A style value for a CSS selector. */
  [selector: string]: unknown;
}
