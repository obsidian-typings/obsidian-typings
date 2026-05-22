/**
 * Options for configuring i18next string interpolation.
 *
 * @public
 * @unofficial
 */
export interface InterpolationOptions {
  /** Whether to escape interpolated values. */
  escapeValue?: boolean;
  /** Prefix for interpolation expressions. */
  prefix?: string;
  /** Suffix for interpolation expressions. */
  suffix?: string;
  /** Additional interpolation options. */
  [key: string]: unknown;
}
