/**
 * Options controlling how a {@link ElectronBrowserView} auto-resizes with its window.
 *
 * @public
 * @unofficial
 */
export interface ElectronAutoResizeOptions {
  /**
   * If `true`, the view's height will grow and shrink together with the window.
   *
   * @default `false`
   */
  height?: boolean;

  /**
   * If `true`, the view's x position and width will grow and shrink proportionally with the window.
   *
   * @default `false`
   */
  horizontal?: boolean;

  /**
   * If `true`, the view's y position and height will grow and shrink proportionally with the window.
   *
   * @default `false`
   */
  vertical?: boolean;

  /**
   * If `true`, the view's width will grow and shrink together with the window.
   *
   * @default `false`
   */
  width?: boolean;
}
