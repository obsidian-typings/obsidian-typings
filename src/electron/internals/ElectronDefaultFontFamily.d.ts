/**
 * Default font families used by the renderer, keyed by generic family.
 *
 * @public
 * @unofficial
 */
export interface ElectronDefaultFontFamily {
  /**
   * The cursive font family.
   *
   * @default `Script`
   */
  cursive?: string;

  /**
   * The fantasy font family.
   *
   * @default `Impact`
   */
  fantasy?: string;

  /**
   * The monospace font family.
   *
   * @default `Courier New`
   */
  monospace?: string;

  /**
   * The sans-serif font family.
   *
   * @default `Arial`
   */
  sansSerif?: string;

  /**
   * The serif font family.
   *
   * @default `Times New Roman`
   */
  serif?: string;

  /**
   * The standard font family.
   *
   * @default `Times New Roman`
   */
  standard?: string;
}
