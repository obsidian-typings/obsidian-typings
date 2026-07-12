/**
 * Options for inserting CSS into a web page.
 *
 * @public
 * @unofficial
 */
export interface ElectronInsertCSSOptions {
  /**
   * Sets the cascade origin of the inserted stylesheet. Can be either `user` or `author`.
   *
   * @default `'author'`
   */
  cssOrigin?: string;
}
