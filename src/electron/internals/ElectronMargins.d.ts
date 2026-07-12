/**
 * The margins of a printed web page.
 *
 * @public
 * @unofficial
 */
export interface ElectronMargins {
  /** The bottom margin of the printed web page, in pixels. */
  bottom?: number;

  /** The left margin of the printed web page, in pixels. */
  left?: number;

  /**
   * The margin type. If `custom` is chosen, `top`, `bottom`, `left`, and `right` must also be specified.
   */
  marginType?: 'custom' | 'default' | 'none' | 'printableArea';

  /** The right margin of the printed web page, in pixels. */
  right?: number;

  /** The top margin of the printed web page, in pixels. */
  top?: number;
}
