import type { Extension } from './Extension.d.ts';
import type { FacetConfig } from './FacetConfig.d.ts';

/**
 * A facet is a labeled value that is associated with an editor state.
 *
 * @public
 * @unofficial
 */
export declare class Facet<Input, Output = readonly Input[]> {
  /**
   * Define a new facet.
   *
   * @param config - The facet configuration.
   * @returns The created facet.
   */
  static define<Input, Output = readonly Input[]>(config?: FacetConfig<Input, Output>): Facet<Input, Output>;

  /**
   * Returns an extension that adds the given value to this facet.
   *
   * @param value - The value to add.
   * @returns The extension.
   */
  of(value: Input): Extension;
}
