import type {
  Extension,
  Facet
} from '@codemirror/state';

/**
 * Configuration for defining a facet.
 *
 * @public
 * @unofficial
 */
export interface FacetConfig<Input, Output> {
  /** Extensions or a function producing extensions to enable when this facet is provided. */
  enables?: ((self: Facet<Input, Output>) => Extension) | Extension;

  /** Whether this facet's value is static (cannot be changed by transactions). */
  static?: boolean;

  /**
   * Combine the input values into a single output value.
   *
   * @param values - The input values.
   * @returns The combined output.
   */
  combine?(values: readonly Input[]): Output;

  /**
   * Compare two output values.
   *
   * @param a - The first value.
   * @param b - The second value.
   * @returns Whether the values are equal.
   */
  compare?(a: Output, b: Output): boolean;

  /**
   * Compare two input values.
   *
   * @param a - The first value.
   * @param b - The second value.
   * @returns Whether the values are equal.
   */
  compareInput?(a: Input, b: Input): boolean;
}
