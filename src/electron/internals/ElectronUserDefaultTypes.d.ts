/**
 * Maps `NSUserDefaults` type names to their corresponding TypeScript types.
 *
 * @public
 * @unofficial
 */
export interface ElectronUserDefaultTypes {
  /** An array value. */
  array: Array<unknown>;

  /** A boolean value. */
  boolean: boolean;

  /** A dictionary value. */
  dictionary: Record<string, unknown>;

  /** A double-precision floating-point value. */
  double: number;

  /** A single-precision floating-point value. */
  float: number;

  /** An integer value. */
  integer: number;

  /** A string value. */
  string: string;

  /** A URL value. */
  url: string;
}
